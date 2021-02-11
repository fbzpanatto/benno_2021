const Subject = require('../models/Subject')
const Teacher = require('../models/Teacher')

module.exports = {
  async index(request, response) {
    try {
      const subject = await Subject.findAll()

      return response.json(subject).status(200)
    } catch (err) {
      console.log({ message: err })
    }
  },

  async store(request, response) {
    try {
      const { person_id } = request.params;
      const { subject_name } = request.body

      const teacher = await Teacher.findByPk(person_id)

      if (!teacher) {
        return response.status(400).json({ error: 'Teacher not found' })
      }

      const [subject, created] = await Subject.findOrCreate({
        where: { subject_name }
      });

      await teacher.addSubject(subject)

      return response.json(subject)
    } catch (err) {
      console.log({ error: err })
    }
  },

  async destroy(request, response) {
    try {
      const { id } = request.params

      await Subject.destroy({ where: { id } })

      response.json({ message: 'Data was destroyed' })
    } catch (err) {
      console.log({ messagem: err })
    }
  }
}