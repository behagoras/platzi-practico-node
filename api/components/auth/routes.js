const express = require('express')

const response = require('../../../network/response')
const controller = require('./index')
const router = express.Router()

router.post('/login', login)

function login (req, res, next) {
  const { username, password } = req.body

  controller.login(username, password)
    .then((token) => {
      response.success(req, res, token, 201)
    })
    .catch(next)
}

module.exports = router
