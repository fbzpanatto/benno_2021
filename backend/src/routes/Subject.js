const express = require('express')
const routes = express.Router()

const SubjectController = require('../controllers/SubjectController')

routes.get('/', (request, response) => SubjectController.index(request, response))
routes.get('/:person_id', (request, response) => SubjectController.getOne(request, response))
routes.post('/:person_id', (request, response) => SubjectController.store(request, response))
routes.delete('/:person_id', (request, response) => SubjectController.destroy(request, response))

module.exports = routes