const Personal_info = require('../models/Personal_info')

module.exports = async (request, response, next) => {
  console.log('estou no middleware', request.body)
  try {

    const { category_id, name, rg, cpf, email, isUser, password, ra, classId, cicleId } = request.body.person
    const { zipcode, street, number, neighborhood, city, state } = request.body.address
    const { ph_number, complement } = request.body.phone
    const arrErr = []

    if (!category_id) {
      const error = new Error('Informe uma categoria')
      arrErr.push(error.message)
    }

    if (!email) {
      const error = new Error('Informe um email valido.')
      arrErr.push(error.message)
    } else {
      const emailExists = await Personal_info.findOne({ where: { email } })
      if (emailExists) {
        const error = new Error('Email ja existe.')
        arrErr.push(error.message)
      }
    }

    if (!name) {
      const error = new Error('Informe um nome valido')
      arrErr.push(error.message)
    }

    if (!category_id === 1) {
      if (!ra) {
        const error = new Error('Informe um ra')
        arrErr.push(error.message)
      }
    }

    if (category_id === 2) {
      if (!cicleId) {
        const error = new Error('Informe um ciclo para o professor')
        arrErr.push(error.message)
      }
    }

    if (!rg) {
      const error = new Error('Informe um rg')
      arrErr.push(error.message)
    } else {
      const rgExists = await Personal_info.findOne({ where: { rg } })
      if (rgExists) {
        const error = new Error('Rg ja existe.')
        arrErr.push(error.message)
      }
    }

    if (!cpf) {
      const error = new Error('Informe um cpf')
      arrErr.push(error.message)
    } else {
      const cpfExists = await Personal_info.findOne({ where: { cpf } })
      if (cpfExists) {
        const error = new Error('Cpf ja existe.')
        arrErr.push(error.message)
      }
    }

    if (!zipcode) {
      const error = new Error('Preencha o cep')
      arrErr.push(error.message)
    }

    if (!street) {
      const error = new Error('Preencha o logradouro')
      arrErr.push(error.message)
    }

    if (!number) {
      const error = new Error('Preencha o numero do logradouro')
      arrErr.push(error.message)
    }

    if (!neighborhood) {
      const error = new Error('Preencha o bairro')
      arrErr.push(error.message)
    }

    if (!city) {
      const error = new Error('Preencha a cidade')
      arrErr.push(error.message)
    }

    if (!state) {
      const error = new Error('Preencha o estado')
      arrErr.push(error.message)
    }

    if (!ph_number) {
      const error = new Error('Informe um numero de telefone')
      arrErr.push(error.message)
    }

    if (!complement) {
      const error = new Error('Informe o nome de contato para o telefone')
      arrErr.push(error.message)
    }

    if (!arrErr.length) {
      next()
    } else {
      return response.json(arrErr)
    }

  } catch (error) {
    console.log(error)
  }
}