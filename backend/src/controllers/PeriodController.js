const knex = require('../config/knex')

module.exports = {
  async index(request, response) {
    try {
      const periods = await knex('periods').select(['id', 'period_name'])

      return response.json(periods).status(200)
    } catch (err) {
      console.log({ error: err })
    }
  }
}