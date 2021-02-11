const Teacher = require('../models/Teacher');
const formatedTeacherResponse = require('../util/teacher')

module.exports = {

  async index(request, response) {
    try {
      const teachers = await Teacher.findAll({
        include: [
          {association: 'person', attributes: ['id', 'name']},
          {
            association: 'subjects',
            attributes: ['subject_name'],
            through: {
              attributes: []
            }
          },
        ]
      })

      const formatedTeachers = teachers.map(teacher => {
        return formatedTeacherResponse(teacher)
      })

      return response.status(200).json({
        total: teachers.length,
        dados: formatedTeachers
      })
    } catch (error) {
      console.log({ message: error })
    }
  },

  async getOne(request, response) {
    try {
      const { person_id } = request.params;

      const teacher = await Teacher.findOne({
        include: [
          {association: 'person', attributes: ['id', 'name']},
          {
            association: 'subjects',
            attributes: ['subject_name'],
            through: {
              attributes: []
            }
          },
        ],
        where: { person_id }
      })

      if (!teacher) {
        return response.status(404).json({ messagem: 'No matches found.' })
      }

      const result = await formatedTeacherResponse(teacher)

      return response.status(200).json(result)
    } catch (error) {
      console.log({ messagem: error })
    }
  },

  async destroy(request, response) {
    try {
      const { person_id } = request.params

      const teacher = await Teacher.findByPk(person_id)

      if (!teacher) {
        return response.status(404).json({ message: 'Data not found' })
      }

      const result = await Teacher.destroy({
        where: { person_id }
      })

      return response.json(result)

    } catch (err) {
      console.log({ message: err })
    }
  }
}