const express = require('express')
const router = require('./routes')
const cors = require('cors')

require('./database')

const app = express()
const PORT = 8081

app.use(cors())
app.use(express.json())
app.use(router)

app.listen(PORT, (err) => {
    if(!err) console.log(`Server Running on port ${PORT}`)
})

module.exports = app