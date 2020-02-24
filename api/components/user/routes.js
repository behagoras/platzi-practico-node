const express = require('express')

const secure = require('./secure')

const response = require('../../../network/response')
const controller = require('./index')
const router = express.Router()

router.get('/', list)
router.get('/follow', secure('follow'), followers)
router.post('/follow/:id', secure('follow'), follow)

router.get('/:id', get)
router.post('/', upsert)
router.put('/', secure('update'), upsert)

function list (req, res, next) {
  // res.send('Todo funciona')
  controller.list()
    .then((list) => {
      response.success(req, res, list, 200)
    })
    .catch(next)
}

function get (req, res, next) {
  console.log('get user')
  // res.send('Todo funciona')
  controller.get(req.params.id)
    .then((user) => {
      response.success(req, res, user, 200)
    })
    .catch(next)
}

function upsert (req, res, next) {
  controller.upsert(req.body)
    .then((user) => {
      response.success(req, res, user, 201)
    })
    .catch(next)
}

function follow (req, res, next) {
  controller.follow(req.user.id, req.params.id)
    .then((data) => {
      response.success(req, res, data, 201)
    })
    .catch(next)
}

function followers (req, res, next) {
  console.log('followers')
  controller.followers(req.user.id)
    .then((data) => {
      response.success(req, res, data, 201)
    })
    .catch(next)
}

module.exports = router
