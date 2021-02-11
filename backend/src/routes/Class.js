const { request, response } = require('express')
const express = require('express')
const routes = express.Router()

const classroom = require('../controllers/ClassroomController')

routes.get('/', (request, response) => classroom.index(request, response))
routes.get('/:id', (request, response) => classroom.getOne(request, response))
routes.post('/', (request, response) => classroom.store(request, response))
routes.put('/:id', (request, response) => classroom.update(request, response))
routes.delete('/:id', (request, response) => classroom.destroy(request, response))
routes.delete('/delete-student/:id', (request, response) => classroom.removeStudentClassId(request, response))

module.exports = routes