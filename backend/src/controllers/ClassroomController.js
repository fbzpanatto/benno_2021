const Classroom = require('../models/Class')
const Student = require('../models/Student')

module.exports = {
  async index(request, response) {
    try {
      const classrooms = await Classroom.findAll({
        include: [
          { association: 'students' }
        ]
      })

      return response.json(classrooms).status(200)
    } catch (err) {
      console.log({ error: err })
    }
  },

  async getOne(request, response) {
    try {
      const { id } = request.params
      const classroom = await Classroom.findByPk(id)

      const studentsClass = await Student.findAll({
        attributes: ['person_id', 'ra'],
        include: { association: 'person', attributes: ['name'] },
        where: { class_id: id }
      })

      console.log(studentsClass)

      return response.json({ classroom, studentsClass }).status(200)
    } catch (err) {
      console.log({ error: err })
    }
  },

  async store(request, response) {
    try {
      const { name } = request.body

      const newClassroom = await Classroom.create({ name })

      return response.json(newClassroom).status(200)
    } catch (err) {
      console.log({ error: err })
    }
  },

  async update(request, response) {
    try {
      const { id } = request.params
      const { name } = request.body

      await Classroom.update({
        class_name: name
      }, { where: { id: id } })

      return response.json({ msg: 'Classe atualizada com sucesso.' }).status(200)

    } catch (err) {
      console.error({ message: err })
    }
  },

  async destroy(request, response) {
    try {
      const { id } = request.params

      await Classroom.destroy({ where: { id } })

      response.json({ message: 'Data was destroyed' })
    } catch (err) {
      console.log({ error: err })
    }
  },

  async removeStudentClassId(request, response) {
    try {
      const { id } = request.params
      await Student.update({
        class_id: null
      }, { where: { person_id: id } })
      return response.json({msg: 'Student removed with success'}).status(200)
    } catch (err) {
      console.log({ error: err })
    }
  }
}