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
  })
  .prefix('api/')

Route.on('/').render('welcome')
