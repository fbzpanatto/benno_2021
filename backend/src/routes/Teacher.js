const express = require('express')
const routes = express.Router()

const TeacherController = require('../controllers/TeacherController')

routes.get('/', (request, response) => TeacherController.index(request, response))
routes.get('/:person_id', (request, response) => TeacherController.getOne(request, response))
// routes.post('/:person_id', (request, response) => TeacherController.store(request, response))
routes.delete('/:person_id', (request, response) => TeacherController.destroy(request, response))

module.exports = routes