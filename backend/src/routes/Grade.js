const express = require('express')
const routes = express.Router()

const GradeController = require('../controllers/GradeController')

routes.get('/', (request, response) => GradeController.index(request, response))
routes.get('/student/:student_id', (request, response) => GradeController.findOndeWithKnex(request, response))
routes.post('/', (request, response) => GradeController.store(request, response))
routes.post('/bulk-store', (request, response) => GradeController.bulkStore(request, response))
routes.put('/student/:student_id', (request, response) => GradeController.update(request, response))
routes.delete('/:id', (request, response) => GradeController.destroy(request, response))

module.exports = routes