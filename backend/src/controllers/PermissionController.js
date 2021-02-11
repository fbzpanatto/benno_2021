const Permission = require('../models/Permission')

module.exports = {

  async index(request, response) {
    try {
      const permissions = await Permission.findAll()

      return response.status(200).json({
        total: permissions.length,
        dados: permissions
      })
    } catch (error) {
      console.log({ message: error })
    }
  },

  async findOne(request, response) {
    try {
      const { person_id } = request.params

      const permission = await Permission.findOne({
        where: { person_id }
      })

      if (!permission) {
        return response.status(404).send({ message: 'Data not exists.' })
      }

      return response.json(permission)

    } catch (err) {
      console.log({ message: err })
    }
  },

  async store(request, response) {
    try {
      const { person_id } = request.params
      const { crud_persons, crud_grades, crud_classes, crud_periods } = request.body

      const permission = await Permission.create({
        person_id,
        crud_persons,
        crud_grades,
        crud_classes,
        crud_periods
      })

      return response.json(permission).status(200)
    } catch (err) {
      console.log({ message: err })
    }
  },

  async update(request, response) {
    const { person_id } = request.params

    const permission = await Permission.findOne({
      where: { person_id }
    })

    if (!permission) {
      return response.status(400).json({ error: 'User not found' })
    }

    const result = await Permission.update(request.body,
      { where: { person_id } }
    )

    return response.json(result)
  },

  async destroy(request, response) {
    try {
      const { person_id } = request.params

      // TODO: Are your sure about that?
      await Permission.destroy({
        where: { person_id }
      })

      response.json({ message: 'Data was destroyed' })
    } catch {
      console.log({ nessage: err })
    }
  }
}