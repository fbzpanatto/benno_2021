const Person = require('../models/Person')
const Address = require('../models/Address');

module.exports = {

  async index(request, response) {
    try {
      const { person_id } = request.params

      const person = await Person.findByPk(person_id, {
        attributes: ['id', 'name'],
        include: { association: 'addresses' }
      })

      return response.json(person)
    } catch (err) {
      console.log({ error: err })
    }
  },

  async store(request, response) {
    try {
      const { person_id } = request.params;
      const { zipcode, street, number, neighborhood, city, state } = request.body

      const person = await Person.findByPk(person_id)

      if (!person) {
        return response.status(400).json({ error: 'User not found' })
      }

      const address = await Address.create({
        person_id,
        zipcode,
        street,
        number,
        neighborhood,
        city,
        state
      });

      return response.json(address)
    } catch (err) {
      console.log({ error: err })
    }
  },

  async update(request, response) {
    try {
      const { person_id, id } = request.params

      const person = await Person.findByPk(person_id)

      if (!person) {
        return response.status(400).json({ error: 'User not found' })
      }

      const result = await Address.update(request.body,
        { where: { id } }
      )

      return response.json(result)
    } catch (err) {
      console.log({ err })
    }
  },

  async destroy(request, response) {
    try {
      const { person_id, id } = request.params

      const person = await Person.findByPk(person_id)

      if (!person) {
        return response.status(400).json({ error: 'User not found' })
      }

      const result = await Address.destroy({
        where: { id }
      })

      return response.status(200).json(result)
    } catch (err) {
      console.log({ message: err })
    }
  }
}