const express = require('express')
const routes = express.Router()

const PersonController = require('../controllers/PersonController')
const PhoneController = require('../controllers/PhoneController')
const AddressController = require('../controllers/AddressController')
const UserController = require('../controllers/UserController')
const PermissionController = require('../controllers/PermissionController')
const registerValidation = require('../middlewares/registerValidation')

routes.get('/', (request, response) => PersonController.index(request, response))
routes.get('/category', (request, response) => PersonController.myTestedeParam(request, response))
routes.get('/:id', (request, response) => PersonController.findOne(request, response))

routes.post('/register', registerValidation, PersonController.store)

routes.put('/:id', (request, response) => PersonController.update(request, response))
routes.delete('/:id', (request, response) => PersonController.destroy(request, response))

routes.get('/:person_id/phones', (request, response) => PhoneController.index(request, response))
routes.post('/:person_id/phones', (request, response) => PhoneController.store(request, response))
routes.put('/:person_id/phones/:id', (request, response) => PhoneController.update(request, response))
routes.delete('/:person_id/phones/:id', (request, response) => PhoneController.destroy(request, response))

routes.get('/:person_id/addresses', (request, response) => AddressController.index(request, response))
routes.post('/:person_id/addresses', (request, response) => AddressController.store(request, response))
routes.put('/:person_id/addresses/:id', (request, response) => AddressController.update(request, response))
routes.delete('/:person_id/addresses/:id', (request, response) => AddressController.destroy(request, response))

routes.get('/users', (request, response) => UserController.index(request, response))
routes.get('/:person_id/users', (request, response) => UserController.findOne(request, response))
routes.post('/:person_id/users', (request, response) => UserController.store(request, response))
routes.put('/:person_id/users', (request, response) => UserController.update(request, response))
routes.delete('/:person_id/users', (request, response) => UserController.destroy(request, response))

routes.get('/users/permissions', (request, response) => PermissionController.index(request, response))
routes.get('/:person_id/users/permissions', (request, response) => PermissionController.findOne(request, response))
routes.post('/:person_id/users/permissions', (request, response) => PermissionController.store(request, response))
routes.put('/:person_id/users/permissions', (request, response) => PermissionController.update(request, response))
routes.delete('/:person_id/users/permissions', (request, response) => PermissionController.destroy(request, response))

module.exports = routes