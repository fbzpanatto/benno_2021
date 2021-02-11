const router = require('express').Router()
const auth = require('../middlewares/auth')

const category = require('./Category')
const person = require('./Person')
const subject = require('./Subject')
const classroom = require('./Class')
const grade = require('./Grade')
const login = require('./Login')
const cicle = require('./Cicle')
const period = require('./Period')
const student = require('./Student')
const teacher = require('./Teacher')

router.use('/categories', category)
router.use('/cicles', cicle)
router.use('/persons', person) //TODO: quem eh que pode se registrar no sistema? qualquer um de fora?
// router.use('/teachers', auth, teacher)
// router.use('/students', student)
router.use('/subjects', subject)
router.use('/classrooms', classroom)
router.use('/grades', grade)
router.use('/login', login)
router.use('/periods', period)
router.use('/validate', auth, (request, response) => {
  return response.status(200).json({msg: 'Validacao feita com sucesso'})
})

module.exports = router