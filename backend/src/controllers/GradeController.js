const Grade = require('../models/Grade')
const Period = require('../models/Period')
const Student = require('../models/Student')
const Subject = require('../models/Subject')
const knex = require('../config/knex')

module.exports = {

  async index(request, response) {
    try {
      const grades = await Grade.findAll()

      return response.status(200).json({
        total: grades.length,
        dados: grades
      })
    } catch (error) {
      console.log({ message: error })
    }
  },

  async findOne(request, response) {
    const { student_id, period_id } = request.params

    const result = await Grade.findAll({
      include: [
        { association: 'periods' },
        { association: 'student' },
        { association: 'subject' }
      ],
      where: {
        student_id,
        // period_id
      }
    })

    return response.status(200).json(result)
  },

  async findOndeWithKnex(request, response) {
    const { student_id } = request.params
    try {
      const data = await knex('grades').where({ 'student_id': student_id })
        .join('students', 'grades.student_id', '=', 'students.person_id')
        .join('subjects', 'grades.subject_id', '=', 'subjects.id')
        .join('periods', 'grades.period_id', '=', 'periods.id')
        .join('persons', 'grades.student_id', '=', 'persons.id')
        .select(
          ['grades.id as gradeId', 'students.person_id as studentId', 'persons.name as studentName', 'grades.period_id', 'periods.period_name', 'grades.subject_id', 'subjects.subject_name as subject', 'grade', 'absences']
        )
      return response.status(200).json({ total: data.length, data })
    } catch (err) {
      return response.status(500).json(err)
    }
  },

  async bulkStore(request, response) {
    const { arr } = request.body
    arr.forEach(el => {
      el.period_id = el['periodId']
      el.student_id = el['person_id']
      el.subject_id = el['subjectId']
      el.grade = el['nota']
      el.absences = el['falta']
      delete el['periodId']
      delete el['person_id']
      delete el['subjectId']
      delete el['ra']
      delete el['person']
      delete el['nota']
      delete el['falta']
    })
    await Grade.bulkCreate(arr)
    return response.status(200).json({msg: 'ok'})
  },

  async store(request, response) {
    try {
      const {
        period_id,
        student_id,
        subject_id,
        grade,
        absences
      } = request.body

      console.log(request.body)

      const data = await Grade.findOne({
        where: {
          period_id,
          student_id,
          subject_id
        },
      })

      const student = await Student.findByPk(student_id)

      const period = await Period.findByPk(period_id)

      const subject = await Subject.findByPk(subject_id)

      if (!student) {
        return response.json({ message: 'Invalid Student' })
      }

      if (!period) {
        return response.json({ message: 'Invalid Period' })
      }

      if (!subject) {
        return response.json({ message: 'Invalid Subject' })
      }

      if (data) {
        return response.json({ message: 'This entry alreay exists, Do you wanna update these values?' })
      }

      const result = await Grade.create({
        period_id,
        student_id,
        subject_id,
        grade,
        absences
      })

      return response.json(result).status(200)
    } catch (err) {
      console.log({ message: err })
    }
  },

  async update(request, response) {
    const { student_id } = request.params
    const arrOfGrades = request.body
    try {
      arrOfGrades.forEach(async element => {
        const currentRegister = await Grade.findOne({
          where: { student_id: student_id, period_id: element.period_id, subject_id: element.subject_id }
        })
        if (currentRegister) {
          await Grade.update({
            grade: element.grade,
            absences: element.absences
          }, { where: { student_id: student_id, period_id: element.period_id, subject_id: element.subject_id } })
        }
      })
      return response.status(200).json({msg: 'Tudo ok'})
    } catch (err) {
      return response.status(500).json(err)
    } 

  },

  async destroy(request, response) {
  }
}