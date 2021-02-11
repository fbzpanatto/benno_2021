class CategoryController {
  constructor(model) {
    this.model = model
  }

  async index(request, response) {
    try {
      const categories = await this.model.findAll({
        include: { association: 'persons' }
      })

      return response.json(categories).status(200)
    } catch (err) {
      console.log({ error: err })
    }
  }

  async indexOnlyCat(request, response) {
    try {
      const categories = await this.model.findAll()

      return response.json(categories).status(200)
    } catch (err) {
      console.log({ error: err })
    }
  }

  async getOne(request, response) {
    try {
      const { id } = request.params
      const category = await this.model.findByPk(id, { include: { association: 'persons' } })

      return response.json(category).status(200)
    } catch (err) {
      console.log({ error: err })
    }
  }

  async store(request, response) {
    try {
      const { name } = request.body

      const newCategories = await this.model.create({ name })

      return response.json(newCategories).status(200)
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

module.exports = CategoryController