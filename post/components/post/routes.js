const express = require('express')

const response = require('../../../network/response')
const controller = require('./index')
const router = express.Router()
const secure = require('./secure')

router.get('/like', secure('logged'), postsLiked)
router.post('/:id/like', secure('add'), like)
router.get('/:id/like', secure('logged'), postLikers)

router.get('/', list)
router.post('/', secure('create'), upsert)
router.put('/', secure('update'), upsert)
router.get('/:id', get)

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

function postsLiked (req, res, next) {
  controller.postsLiked(req.user.id)
    .then((user) => {
      response.success(req, res, user, 200)
    })
    .catch(next)
}

function like (req, res, next) {
  controller.like(req.user.id, req.params.id)
    .then((user) => {
      response.success(req, res, user, 201)
    })
    .catch(next)
}

function postLikers (req, res, next) {
  controller.postLikers(req.user.id, req.params.id)
    .then((data) => {
      response.success(req, res, data, 201)
    })
    .catch(next)
}

module.exports = router
