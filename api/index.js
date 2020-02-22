const express = require('express')
const bodyParser = require('body-parser')
const swaggerUi = require('swagger-ui-express')

const config = require('../config.js')
const user = require('./components/user/routes')
const auth = require('./components/auth/routes')

const app = express()

// Imported Express Middlewares
app.use(bodyParser.json())

const swaggerDoc = require('./swagger.json')

// Custom Express Middlewares

// Express Router for getting Network for each endpoint
app.use('/api/user', user)
app.use('/api/auth', auth)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc))

// Initializing express
app.listen(config.api.port, () => {
  console.log('Api listening in port ', config.api.port)
})
