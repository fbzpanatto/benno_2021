const Sequelize = require('sequelize')
const dbConfig = require('../config/database')

const connection = new Sequelize(dbConfig)

const objectOfModels = require('./models')

const initAndAssociateModels = require('../util/initAndAssc')(objectOfModels, connection)
initAndAssociateModels

// console.log(connection.authenticate())
// connection.sync({force: true})
console.log(connection.models)

module.exports = connection