class CicleController {
  constructor(model) {
    this.model = model
  }

  async index(request, response) {
    try {
      const cicles = await this.model.findAll({
        // include: { association: 'teachers' }
      })

      return response.json(cicles).status(200)
    } catch (err) {
      console.log({ error: err })
    }
  }

  async indexOnlyCat(request, response) {
    try {
      const cicles = await this.model.findAll()

      return response.json(cicles).status(200)
    } catch (err) {
      console.log({ error: err })
    }
  }

  async getOne(request, response) {
    try {
      const { id } = request.params
      const cicle = await this.model.findByPk(id, { include: { association: 'persons' } })

      return response.json(cicle).status(200)
    } catch (err) {
      console.log({ error: err })
    }
  }

  async store(request, response) {
    try {
      const { name: ciclecol } = request.body

      const newCicles = await this.model.create({ ciclecol })

      return response.json(newCicles).status(200)
    } catch (err) {
      console.log({ error: err })
    }
  }

  async destroy(request, response) {
    try {
      const { id } = request.params

      await this.model.destroy({ where: { id } })

      response.json({ message: 'Data was destroyed' })
    } catch (err) {
      console.log({ error: err })
    }
  }

}

module.exports = CicleController