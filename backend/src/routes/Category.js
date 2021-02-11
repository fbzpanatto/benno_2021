const express = require('express')
const routes = express.Router()

const CategoryController = require('../controllers/CategoryController')
const Category = require('../models/Category')

const controller = new CategoryController(Category)

routes.get('/', (request, response) => controller.index(request, response))
routes.get('/get', (request, response) => controller.indexOnlyCat(request, response))
routes.get('/:id', (request, response) => controller.getOne(request, response))
routes.post('/', (request, response) => controller.store(request, response))
routes.delete('/:id', (request, response) => controller.destroy(request, response))

module.exports = routes