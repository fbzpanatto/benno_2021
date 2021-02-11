const jwt = require('jsonwebtoken')
const { jwtSecret } = require('../config/database')

module.exports = (request, response, next) => {
  const authToken = request.headers['authorization']

  if(authToken != undefined) {
    const bearer = authToken.split(' ')
    const token = bearer[1]

    jwt.verify(token, jwtSecret, (err, data) => {
      if(err) {
        response.status(401).json({err: "Invalid token."})
      } else {
        request.token = token
        request.loggedUser = {id: data.id, email: data.email}
        next()
      }
    })
  } else {
    response.status(401).json({message: 'Not authorized.'})
  }
}