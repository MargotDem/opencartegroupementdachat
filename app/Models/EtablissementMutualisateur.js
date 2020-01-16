'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class EtablissementMutualisateur extends Model {
    static get table () {
        return 'ocga_mutualisateurs'
    }
    static get createdAtColumn() {
        return null
    }
    static get updatedAtColumn() {
        return null
    }
    static get primaryKey () {
        return 'code_uai'
    }
}

module.exports = EtablissementMutualisateur
