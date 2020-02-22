const express = require('express')

const response = require('../../../network/response')
const controller = require('./index')
const router = express.Router()

router.post('/login', login)

function login (req, res) {
  // res.send('Todo funciona')
  const { username, password } = req.body

  controller.login(username, password)
    .then((token) => {
      response.success(req, res, token, 200)
    })
    .catch((error) => {
      response.error(req, res, error.message || 'Información invalida', 400)
    })
}

module.exports = router
