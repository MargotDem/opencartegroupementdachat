'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')


Route.group(() => {
    Route.get('mots-cles', 'MotsCleController.index')
    Route.post('etablissements', 'EtablissementMutualisateurController.store')
    Route.get('etablissements', 'EtablissementMutualisateurController.index')
    Route.put('etablissements/:code_uai', 'EtablissementMutualisateurController.update')
    Route.get('departements/:code_uai', 'EtablissementMutualisateurController.getDepartements')
    Route.get('motsCles/:code_uai', 'EtablissementMutualisateurController.getMotsCles')
  })
  .prefix('api/')

Route.group(() => {
  Route.post('login', 'AdminController.login')
  Route.get('addPending', 'AdminController.addPending')
  Route.get('deletePending', 'AdminController.deletePending')
  Route.post('approveAdd/:code_uai', 'AdminController.approveAdd')
  Route.post('deleteSchool/:code_uai', 'AdminController.deleteSchool')
})
.prefix('api/admin/')

Route.on('/').render('welcome')
