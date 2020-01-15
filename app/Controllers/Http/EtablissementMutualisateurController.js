'use strict'

const Database = use('Database')
const EtablissementMutualisateur = use('App/Models/EtablissementMutualisateur')
// const Etablissement = use('App/Models/Etablissement')


const STATUSES = [
  "added",
  "addPending",
  "deleted",
  "deletePending"
]

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with etablissementmutualisateurs
 */
class EtablissementMutualisateurController {
  /**
   * Show a list of all etablissementmutualisateurs.
   * GET etablissementmutualisateurs
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {

    try {
      const query = request.get()
      console.log("HEY", Object.keys(query))
      console.log("HO", Object.values(query))

      let sqlConditions = ''
      let motCles = []

      for (let i = 0; i < Object.keys(query).length; i++) {
        let field = Object.keys(query)[i]
        let criterion = Object.values(query)[i]

        if (criterion === "") {
          motCles.push(field)
        } else {
          switch (field) {
            case "type_marche":
              sqlConditions = sqlConditions + `ocga_mutualisateurs.${criterion} = 1 AND `
              break
            case "region":
              sqlConditions = sqlConditions + `etablissements.region = '${criterion}' AND `
              break
            case "academie":
              sqlConditions = sqlConditions + `etablissements.academie = '${criterion}' AND `
              break
            case "departement":
              sqlConditions = sqlConditions + `ocga_mutualisateurs_departements.departement = '${criterion}' AND `
              break
            case "nom":
              sqlConditions = sqlConditions + `etablissements.nom LIKE '%${criterion}%' AND `
              break
            case "code_uai":
              sqlConditions = sqlConditions + `ocga_mutualisateurs.code_uai = '${criterion}' AND `
              break
          }
        }

      }

      if (sqlConditions !== '' && motCles.length === 0) {
        sqlConditions = sqlConditions.slice(0, -4)
      }

      if (motCles.length > 0) {
        let sqlMotsClesConditions = ""
        for (let j = 0; j < motCles.length; j++) {
          sqlMotsClesConditions = sqlMotsClesConditions + `ocga_mots_cles.mot_cle = '${motCles[j]}' OR `
        }
        sqlMotsClesConditions = sqlMotsClesConditions.slice(0, -3)
        sqlConditions = sqlConditions + " (" + sqlMotsClesConditions + ")"
      }

      let sqlQuery = `
      select COUNT(ocga_mutualisateurs.code_uai), ocga_mutualisateurs.code_uai, email, nombre_adherents, eple, autres_admins_publiques, ville_couverte, services, fournitures, ocga_mutualisateurs.infos_complementaires, ocga_mutualisateurs.up_to_date, status, nom, adresse, code_postal, commune, etablissements.departement, region, academie, ocga_mutualisateurs.telephone
      from ocga_mutualisateurs
      inner join etablissements ON etablissements.code_uai = ocga_mutualisateurs.code_uai

      left join ocga_mutualisateurs_departements ON ocga_mutualisateurs.code_uai = ocga_mutualisateurs_departements.code_uai

      left join ocga_mutualisateurs_mots_cles on ocga_mutualisateurs_mots_cles.code_uai = ocga_mutualisateurs.code_uai
      left join ocga_mots_cles on ocga_mots_cles.id = ocga_mutualisateurs_mots_cles.id_mot_cle

      WHERE ${sqlConditions}
      group by code_uai
      `

      console.log("SQL QUERY : ", sqlQuery)

      let data = Database
        .raw(sqlQuery)
      return await data
    } catch (error) {
      return "Error: " + error
    }
  }

  /**
   * Render a form to be used for creating a new etablissementmutualisateur.
   * GET etablissementmutualisateurs/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create({ request, response, view }) {
  }

  /**
   * Create/save a new etablissementmutualisateur.
   * POST etablissementmutualisateurs
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    const {
      code_uai,
      email,
      nombre_adherents,
      type_adherents,
      zone_de_couverture_code_postal,
      zone_de_couverture_departement,
      zone_de_couverture_departements,
      type_marche,
      mots_cles_fournitures,
      mots_cles_services,
      infos_complementaires,
      nom,
      adresse,
      code_postal,
      commune,
      telephone,
      region,
      academie,
      departement
    } = request.all()

    try {
      let etablissement = await Database
        .table('etablissements')
        .where('code_uai', code_uai)
        .first()

      if (etablissement) {
        await Database
          .table('etablissements')
          .where('code_uai', code_uai)
          .update({
            nom,
            adresse,
            code_postal,
            commune,
            telephone,
            region,
            academie,
            departement
          })
      } else {
        response.noContent('L’établissement n’existe pas dans la base')
        return "response: " + response
      }
    } catch (error) {
      return "Error: " + error
    }

    try {
      const newEtablissement = new EtablissementMutualisateur()

      newEtablissement.code_uai = code_uai
      newEtablissement.email = email
      newEtablissement.nombre_adherents = nombre_adherents
      newEtablissement.eple = ((type_adherents === "1" || type_adherents === "3") ? 1 : 0)
      newEtablissement.autres_admins_publiques = ((type_adherents === "2" || type_adherents === "3") ? 1 : 0)
      if (zone_de_couverture_code_postal) {
        newEtablissement.ville_couverte = zone_de_couverture_code_postal
      }
      newEtablissement.services = ((type_marche === "2" || type_marche === "3") ? 1 : 0)
      newEtablissement.fournitures = ((type_marche === "1" || type_marche === "3") ? 1 : 0)
      newEtablissement.infos_complementaires = infos_complementaires

      newEtablissement.status = STATUSES[1]

      await newEtablissement.save()

    } catch (error) {
      return "Error: " + error
    }


    if ((type_marche === "1" || type_marche === "3") && mots_cles_fournitures.length > 0) {
      try {
        for (let i = 0; i < mots_cles_fournitures.length; i++) {
          await Database
            .raw('INSERT INTO ocga_mutualisateurs_mots_cles VALUES (?, ?)', [code_uai, mots_cles_fournitures[i]])
        }
      } catch (error) {
        return "Error: " + error
      }
    }

    if ((type_marche === "2" || type_marche === "3") && mots_cles_services.length > 0) {
      try {
        for (let i = 0; i < mots_cles_services.length; i++) {
          await Database
            .raw('INSERT INTO ocga_mutualisateurs_mots_cles VALUES (?, ?)', [code_uai, mots_cles_services[i]])
        }
      } catch (error) {
        return "Error: " + error
      }
    }

    if (zone_de_couverture_departement) {
      try {
        await Database.raw('INSERT INTO ocga_mutualisateurs_departements VALUES (?, ?)', [code_uai, zone_de_couverture_departement])
      } catch (error) {
        return "Error: " + error
      }

    } else if (zone_de_couverture_code_postal) {
      try {
        await Database.raw('INSERT INTO ocga_mutualisateurs_departements VALUES (?, ?)', [code_uai, departement])
      } catch (error) {
        return "Error: " + error
      }
    } else if (zone_de_couverture_departements.length > 0) {
      try {
        for (let i = 0; i < zone_de_couverture_departements.length; i++) {
          await Database.raw('INSERT INTO ocga_mutualisateurs_departements VALUES (?, ?)', [code_uai, zone_de_couverture_departements[i]])
        }
      } catch (error) {
        return "Error: " + error
      }
    }

    return "response: " + response
  }

  /**
   * Display a single etablissementmutualisateur.
   * GET etablissementmutualisateurs/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing etablissementmutualisateur.
   * GET etablissementmutualisateurs/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({ params, request, response, view }) {
  }

  /**
   * Update etablissementmutualisateur details.
   * PUT or PATCH etablissementmutualisateurs/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
    const query = request.all()
    if ("update" in query) {

      let date = new Date();
      let month = (date.getUTCMonth() + 1) < 10 ? "0" + (date.getUTCMonth() + 1) : (date.getUTCMonth() + 1)
      let timestamp = date.getUTCFullYear() + "-" + month + "-" + date.getUTCDate()

      try {
        console.log("hey", timestamp)
        return await Database
          .table('ocga_mutualisateurs')
          .where('code_uai', params.code_uai)
          .update('up_to_date', timestamp)
      } catch (error) {
        return "Error: " + error
      }

    }
  }

  /**
   * Delete a etablissementmutualisateur with id.
   * DELETE etablissementmutualisateurs/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
  }





  async getDepartements({ params }) {
    try {
      return await Database
        .raw(`select departement from ocga_mutualisateurs_departements where code_uai = ?`, [params.code_uai])
    } catch (error) {
      return "Error: " + error
    }
  }

  async getMotsCles({ params }) {
    try {
      return await Database
        .raw(`select * from ocga_mutualisateurs_mots_cles
        inner join ocga_mots_cles on ocga_mots_cles.id = ocga_mutualisateurs_mots_cles.id_mot_cle
        where ocga_mutualisateurs_mots_cles.code_uai = ?`, [params.code_uai])
    } catch (error) {
      return "Error: " + error
    }
  }
}

// select * from 
module.exports = EtablissementMutualisateurController
