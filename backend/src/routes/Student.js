const express = require('express')
const routes = express.Router()

const StudentController = require('../controllers/StudentController')

routes.get('/', (request, response) => StudentController.index(request, response))
routes.get('/:person_id', (request, response) => StudentController.getOne(request, response))
routes.post('/:person_id', (request, response) => StudentController.store(request, response))
routes.delete('/:person_id', (request, response) => StudentController.destroy(request, response))

module.exports = routes