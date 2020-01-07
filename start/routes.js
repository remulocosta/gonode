'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.post('users', 'UserController.store').validator('User')
Route.post('sessions', 'SessionController.store').validator('Session')

Route.post('passwords', 'ForgotPasswordController.store').validator(
  'ForgotPassword'
)
Route.put('passwords', 'ForgotPasswordController.update').validator(
  'ResetPassword'
)

Route.get('/files/:id', 'FileController.show')

Route.group(() => {
  Route.post('/files', 'FileController.store')

  // Route.get('/projects', 'ProjectController.index')
  Route.resource('projects', 'ProjectController')
    .apiOnly()
    .validator(
      new Map([
        [['projects.store'], ['Project']] //,
        // [['projects.store'], ['Project']] //,
        // [
        //   ['projects.update'],
        //   ['ProjectUp']
        // ]
      ])
    )

  Route.resource('projects.tasks', 'TaskController')
    .apiOnly()
    .validator(new Map([[['projects.tasks.store'], ['Task']]]))
}).middleware(['auth'])
