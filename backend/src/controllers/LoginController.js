const User = require('../models/User')
const jwt = require('jsonwebtoken')
const { jwtSecret } = require('../config/database')
const bcrypt = require('bcrypt')

module.exports = {

  async login(request, response) {
    try {
      const { email, password } = request.body

      if (!email && !password) {
        response.status(400).json({ message: "Invalid credentials" })
      }

      const user = await User.findOne({
        where: { email }
      })

      if (!user) {
        response.status(404).json({ message: "User not found." })
      }

      await bcrypt.compare(password, user.password, (err, result) => {
        if (err) {
          return response.status(400).json({ message: err })
        }
        if (result) {
          jwt.sign({ id: user.person_id, email: user.email }, jwtSecret, { expiresIn: '1h' }, (err, token) => {
            if (err) {
              return response.status(400).json({ message: err })
            } else {
              return response.status(200).json({ token: token })
            }
          })
        } else {
          return response.status(401).json({ message: 'Invalid Password' })
        }
      })

    } catch (error) {
      console.log({ message: error })
    }
  }
}