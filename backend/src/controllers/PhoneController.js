const Person = require('../models/Person')
const Phone = require('../models/Phone');

module.exports = {

  async index(req, res) {
    try {
      const { person_id } = req.params

      const person = await Person.findByPk(person_id, {
        include: { association: 'phones' }
      })
  
      console.log(person)
  
      return res.json(person.phones)
    } catch (error) {
      console.log({message: error})
    }
  },

  async store(req, res) {
    try {
      const { person_id } = req.params;
      const { number, complement } = req.body

      const person = await Person.findByPk(person_id)

      if (!person) {
        return res.status(400).json({ error: 'User not found' })
      }

      const result = await Phone.create({
        person_id,
        number,
        complement
      });

      return res.json(result)
    } catch (err) {
      console.log(err)
    }
  },

  async update(request, response) {
    const { person_id, id } = request.params

    const person = await Person.findByPk(person_id)

    if (!person) {
      return response.status(400).json({ error: 'User not found' })
    }

    const result = await Phone.update(request.body,
      { where: { id } }
    )

    return response.json(result)
  },

  async destroy(request, response) {
    try {
      const { person_id, id } = request.params

      const person = await Person.findByPk(person_id)

      if (!person) {
        return response.status(400).json({ error: 'User not found' })
      }

      const result = await Phone.destroy({
        where: { id }
      })

      return response.status(200).json(result)
    } catch (err) {
      console.log({ message: err })
    }
  }
}