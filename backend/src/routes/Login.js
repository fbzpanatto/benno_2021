const express = require('express')
const routes = express.Router()

const LoginController = require('../controllers/LoginController')

routes.post('/', (request, response) => LoginController.login(request, response))

module.exports = routes