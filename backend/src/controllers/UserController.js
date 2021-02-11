// TODO: nao esta finalizado

const User = require('../models/User')
const bcrypt = require('bcrypt')

module.exports = {

  async index(request, response) {
    try {
      const users = await User.findAll()

      return response.status(200).json({
        total: users.length,
        dados: users
      })
    } catch (error) {
      console.log({ message: error })
    }
  },

  async findOne(request, response) {
    try {
      const { person_id } = request.params

      const user = await User.findOne({
        where: { person_id }
      })

      if (!user) {
        return response.status(404).send({ message: 'Data not exists.' })
      }

      return response.json(user)

    } catch (err) {
      console.log({ message: err })
    }
  },

  async store(request, response) {

    try {
      const { person_id } = request.params
      const { email, password } = request.body

      const salt = await bcrypt.genSalt()
      const encodedPassword = await bcrypt.hash(password, salt)

      const user = await User.create({
        person_id,
        email,
        password: encodedPassword
      })

      return response.json(user).status(200)
    } catch (err) {
      console.log({ message: err })
    }
  },

  async update(request, response) {
    const { person_id } = request.params

    const user = await User.findOne({
      where: { person_id }
    })

    if (!user) {
      return response.status(400).json({ error: 'User not found' })
    }

    const result = await User.update(request.body,
      { where: { person_id } }
    )

    return response.json(result)
  },

  async destroy(request, response) {
    try {
      const { person_id } = request.params

      // TODO: Are your sure about that?
      await User.destroy({
        where: { person_id }
      })

      response.json({ message: 'Data was destroyed' })
    } catch {
      console.log({ nessage: err })
    }
  }
}