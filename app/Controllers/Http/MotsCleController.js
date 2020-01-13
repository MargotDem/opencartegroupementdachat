'use strict'

const MotsCle = use('App/Models/MotsCle')


class MotsCleController {
    async index () {
        try {
          const motsClesFournitures = await MotsCle.findAll(1)
          const motsClesServices = await MotsCle.findAll(2)
          return {
            motsClesFournitures: motsClesFournitures,
            motsClesServices: motsClesServices
          }
        } catch (error) {
          return error
        }
      }
}

module.exports = MotsCleController
