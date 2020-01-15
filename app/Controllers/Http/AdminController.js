'use strict'

const Database = use('Database')

class AdminController {
    async login({ request }) {
        let { email, password } = request.all()
        try {
            return await Database
                .table('ocga_admins')
                .where('email', email)
                .where('password', password)
        } catch (error) {
            return "Error: " + error
        }
    }

    async addPending() {
        try {
            return await Database
              .raw(`select * from ocga_mutualisateurs
              inner join etablissements ON etablissements.code_uai = ocga_mutualisateurs.code_uai
              where status = 'addPending'`)
        } catch (error) {
            return "Error: " + error
        }
    }
    
    async approveAdd({ params }) {
        try {
            return await Database
              .table('ocga_mutualisateurs')
              .where('code_uai', params.code_uai)
              .update('status', 'added')
        } catch (error) {
            return "Error: " + error
        }
    }
    async deleteSchool({ params }) {
        try {
            return await Database
              .table('ocga_mutualisateurs')
              .where('code_uai', params.code_uai)
              .update('status', 'deleted')
        } catch (error) {
            return "Error: " + error
        }
    }
}

module.exports = AdminController
