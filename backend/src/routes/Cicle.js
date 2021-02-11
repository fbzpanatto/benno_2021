const express = require('express')
const routes = express.Router()

const CicleController = require('../controllers/CicleController')
const Cicle = require('../models/Cicles')

const controller = new CicleController(Cicle)

routes.get('/', (request, response) => controller.index(request, response))
routes.get('/get', (request, response) => controller.indexOnlyCat(request, response))
routes.get('/:id', (request, response) => controller.getOne(request, response))
routes.post('/', (request, response) => controller.store(request, response))
routes.delete('/:id', (request, response) => controller.destroy(request, response))

module.exports = routes