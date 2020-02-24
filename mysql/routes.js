const express = require('express')

const response = require('../network/response')
const Store = require('../store/mysql')
const router = express.Router()

async function list (req, res, next) {
  try {
    const datos = await Store.list(req.params.table)
    response.success(req, res, datos, 200)
  } catch (error) {
    response.error(req, res, error, 500)
  }
}

const get = async (req, res, next) => {
  try {
    const datos = await Store.get(req.params.table, [{ id: req.params.id }])
    response.success(req, res, datos, 200)
  } catch (error) {
    response.error(req, res, error, 500)
  }
}

const insert = async (req, res, next) => {
  try {
    const datos = await Store.insert(req.params.table, req.body)
    response.success(req, res, datos, 200)
  } catch (error) {
    response.error(req, res, error, 500)
  }
}

const upsert = async (req, res, next) => {
  try {
    const datos = await Store.upsert(req.params.table, req.body)
    response.success(req, res, datos, 200)
  } catch (error) {
    response.error(req, res, error, 500)
  }
}

// router.get('/', (req, res, next) => response.success(req, res, 'hello', 200))
router.get('/:table', list)
router.get('/:table/:id', get)
router.post('/:table/', insert)
router.put('/:table/', upsert)

module.exports = router
