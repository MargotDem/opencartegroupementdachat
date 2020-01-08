'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class EtablissementsSchema extends Schema {
  up () {
    this.create('etablissements', (table) => {
      table.increments()
      table.string('uai', 8).notNullable().unique()
      table.string('nom', 100).notNullable()
      table.string('departement', 100).notNullable()
      table.string('region', 100).notNullable()
      table.string('academie', 100).notNullable()
      table.string('status', 20).notNullable()
      table.timestamps()
      table.string('ip_update', 20).notNullable()
    })
  }

  down () {
    this.drop('etablissements')
  }
}

module.exports = EtablissementsSchema
