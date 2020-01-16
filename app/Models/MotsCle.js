'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class MotsCle extends Model {
    static get table() {
        return 'ocga_mots_cles'
    }
    static get createdAtColumn() {
        return null
    }
    static get updatedAtColumn() {
        return null
    }
    static async findAll(categorie) {
        try {
            const motsCles = await MotsCle
                .query()
                .where('categorie', categorie)
                .where('status', 'added')
                .fetch()
            return motsCles
        } catch (error) {
            return error
        }
    }
}

module.exports = MotsCle
