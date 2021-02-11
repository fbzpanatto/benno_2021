module.exports = require('knex')({
  client: 'mysql2',
  connection: {
    host: 'localhost',
    user: 'root',
    password: 'fnp181292',
    database: 'benno'
  }
})