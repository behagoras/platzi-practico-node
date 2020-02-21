const express = require('express')
const bodyParser = require('body-parser')

const config = require('../config.js')
const user = require('./components/user/routes')

const app = express()

// Imported Express Middlewares
app.use(bodyParser.json())

// Custom Express Middlewares

// Express Router for getting Network for each endpoint
app.use('/api/user', user)

// Initializing express
app.listen(config.api.port, () => {
  console.log('Api listening in port ', config.api.port)
})
