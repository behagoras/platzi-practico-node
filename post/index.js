const express = require('express')
const bodyParser = require('body-parser')

const config = require('../config.js')
const post = require('./components/post/routes')

const app = express()

// Imported Express Middlewares
app.use(bodyParser.json())

// Custom Express Middlewares
const errors = require('../network/errors')

// Express Router for getting Network for each endpoint
app.use('/api/post', post)

app.use(errors)

// Initializing express
app.listen(config.post.port, () => {
  console.log('Servicio de post listening in port ', config.post.port)
})
