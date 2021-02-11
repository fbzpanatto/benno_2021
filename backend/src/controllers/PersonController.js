const Person = require('../models/Person')
const Teacher = require('../models/Teacher')
const Personal_info = require('../models/Personal_info')
const User = require('../models/User')
const Permission = require('../models/Permission')
const bcrypt = require('bcrypt')
const formatPersonResponse = require('../util/person')
const knex = require('../config/knex')
const person = require('../util/person')
const Address = require('../models/Address')
const Phone = require('../models/Phone')
const Student = require('../models/Student')

module.exports = {

  async index2(request, response) {
    // try{
    //   const data = await knex('categories')
    //     .join('persons', 'categories.id', '=', 'persons.category_id')
    //     .select(
    //       ['persons.id', 'persons.name as person', 'categories.name as category'])
    //   console.log(data)
    //   return response.status(200).json({total: data.length, data2: data})
    // } catch (err) {
    //   return response.status(500).json({messageError: err})
    // }

    try {
      const data = await knex('persons')
        .join('categories', 'persons.category_id', '=', 'categories.id')
        .join('personal_information', 'persons.id', '=', 'personal_information.person_id')
        // .join('phones', 'persons.id', '=', 'phones.person_id')
        .select(
          ['persons.id', 'persons.name as person', 'categories.name as category', 'rg', 'cpf', 'email']
        )
      return response.status(200).json({ total: data.length, data3: data })
    } catch (err) {
      return response.status(500).json({ methodName: this.index2.name, messageError: err })
    }

  },

  async index(request, response) {
    try {
      const persons = await Person.findAll({
        attributes: ['id', 'name'],
        include: [
          { association: 'category', attributes: ['name'] },
          { association: 'documents', attributes: ['email', 'rg', 'cpf'] },
          { association: 'phones', attributes: ['number', 'complement'] },
          { association: 'addresses', attributes: ['street', 'number', 'neighborhood', 'city', 'state', 'zipcode'] },
        ],
      })

      // const formatedPersons = persons.map(person => {
      //   return formatPersonResponse(person)
      // })

      // console.log(formatedPersons[1].personal_information.rg)

      return response.status(200).json(persons)

    } catch (error) {
      console.log({ message: error })
    }
  },

  async myTestedeParam(request, response) {
    try {

      const { categoryid } = request.query

      if (!categoryid || categoryid == null || categoryid == undefined || categoryid == 0) {
        return this.index(request, response)
      }
      const persons = await Person.findAll({
        attributes: ['id', 'name'],
        include: [
          { association: 'category', attributes: ['name'] },
          { association: 'documents', attributes: ['email', 'rg', 'cpf'] },
          { association: 'phones', attributes: ['number', 'complement'] },
          { association: 'addresses', attributes: ['street', 'number', 'neighborhood', 'city', 'state', 'zipcode'] },
        ],
        where: { category_id: categoryid }
      })
      return response.status(200).json(persons)

    } catch (error) {
      console.log({ message: error })
    }
  },

  async findOne(request, response) {
    try {
      const { id } = request.params

      const person = await Person.findByPk(id, {
        attributes: ['id', 'name'],
        include: [
          { association: 'category', attributes: ['name'] },
          { association: 'documents', attributes: ['email', 'rg', 'cpf'] },
          { association: 'phones', attributes: ['number', 'complement'] },
          { association: 'addresses', attributes: ['street', 'number', 'neighborhood', 'city', 'state', 'zipcode'] },
        ],
      })

      if (!person) {
        return response.status(404).send({ message: 'Data not exists.' })
      }

      const result = formatPersonResponse(person)

      console.log(result)

      return response.json(result)

    } catch (err) {
      console.log({ message: err })
    }
  },

  async findRg(request, response) {
    const { rg } = request.params
    try {
      const rgExists = await Personal_info.findOne({ where: { rg } })
      if (rgExists) {
        return response.status(200).send(true)
      }
      return response.status(200).send(false)
    } catch (error) {
      console.log(error)
    }
  },

  async store(request, response) {
    // const { id, email } = request.loggedUser
    // const { token } = request.token

    // const loggedUser = await Permission.findByPk(id)

    // const operatedBy = {
    //   userId: loggedUser.getDataValue('person_id'),
    //   hasPermission: loggedUser.getDataValue('crud_persons'),
    //   email,
    //   token
    // }

    // if (!operatedBy.hasPermission) {
    //   return response.status(401).json({ err: 'You do not have permission for that. Contact your Administrator.' })
    // }

    try {

      const { category_id, name, rg, cpf, email, isUser, password, ra, classId, cicleId } = request.body.person
      const { zipcode, street, number, neighborhood, city, state } = request.body.address
      const { ph_number, complement } = request.body.phone

      const person = await Person.create({
        category_id,
        name
      })

      await Personal_info.create({
        person_id: person.getDataValue('id'),
        rg,
        cpf,
        email
      })

      await Address.create({
        person_id: person.getDataValue('id'),
        zipcode,
        street,
        number,
        neighborhood,
        city,
        state,
      })

      await Phone.create({
        person_id: person.getDataValue('id'),
        number: ph_number,
        complement
      })

      if (category_id == 1) {
        await Student.create({
          person_id: person.getDataValue('id'),
          ra,
          class_id: classId
        })
      }

      if (category_id == 2) {
        await Teacher.create({
          person_id: person.getDataValue('id'),
          cicle_id: cicleId
        })
      }

      if (isUser == true) {

        const defaultPassword = password
        const salt = await bcrypt.genSalt()
        const encodedPassword = await bcrypt.hash(defaultPassword, salt)

        await User.create({
          person_id: person.getDataValue('id'),
          email,
          password: encodedPassword
        })
      }
      return response.status(204).json({ msg: 'User was created.' })

    } catch (err) {
      console.error({ message: err })
      response.status(409)
      response.json(arrErr)
      return
    }
  },

  async update(request, response) {
    const { id } = request.params

    const { name, rg, cpf, email } = request.body.person

    const { zipcode, street, number, neighborhood, city, state } = request.body.address

    const { ph_number, complement } = request.body.phone

    console.log(request.body)

    const person = await Person.findByPk(id)

    if (!person) {
      return response.status(400).json({ error: 'User not found' })
    }

    await Address.update({
      zipcode,
      street,
      number,
      neighborhood,
      city,
      state
    }, { where: { person_id: id } })

    await Phone.update({
      number: ph_number,
      complement
    }, { where: { person_id: id } })

    await User.update({
      name
    }, { where: { person_id: id } })

    await Personal_info.update({
      email
    },
      { where: { person_id: id } })

    const result = await Person.update(request.body,
      { where: { id } }
    )

    return response.json(result)
  },

  async destroy(request, response) {
    try {
      const { id } = request.params

      // TODO: Are your sure about that?
      await Person.destroy({ where: { id } })

      response.json({ message: 'Data was destroyed' })
    } catch {
      console.log({ nessage: err })
    }
  }
}