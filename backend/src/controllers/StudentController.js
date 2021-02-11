const Student = require('../models/Student');

module.exports = {

  async index(request, response) {
    try {
      const students = await Student.findAll()

      return response.status(200).json({
        total: students.length,
        dados: students
      })
    } catch (error) {
      console.log({ message: error })
    }
  },

  async getOne(request, response) {
    try {
      const { person_id } = request.params;

      const student = await Student.findOne({
        where: { person_id }
      })

      if (!student) {
        return response.status(404).json({ messagem: 'No matches found.' })
      }

      return response.status(200).json(student)
    } catch (error) {
      console.log({ messagem: error })
    }
  },

  async store(request, response) {
    try {
      const { person_id } = request.params;
      const { ra, class_id } = request.body

      const student = await Student.create({
          person_id,
          ra,
          class_id
      });

      return response.json(student)
    } catch (err) {
      console.log({ message: err })
    }
  },

  async destroy(request, response) {
    try {
      const { person_id } = request.params

      const student = await Student.findByPk(person_id)

      if (!student) {
        return response.status(404).json({ message: 'Data not found' })
      }

      const result = await Student.destroy({
        where: { person_id }
      })

      return response.json(result)

    } catch (err) {
      console.log({ message: err })
    }
  }
}