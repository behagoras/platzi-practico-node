const express = require('express')

const response = require('../../../network/response')
const controller = require('./index')
const router = express.Router()
const secure = require('./secure')

router.get('/', list)
router.get('/:id', get)
router.post('/', secure('create'), upsert)
router.put('/', secure('update'), upsert)

function list (req, res, next) {
  controller.list()
    .then(data => {
      response.success(req, res, data, 200)
    })
    .catch(next)
}

function get (req, res, next) {
  controller.get(req.params.id)
    .then((user) => {
      response.success(req, res, user, 200)
    })
    .catch(next)
}

function upsert (req, res, next) {
  controller.upsert(req.user.id, req.body)
    .then((user) => {
      response.success(req, res, user, 201)
    })
    .catch(next)
}

module.exports = router