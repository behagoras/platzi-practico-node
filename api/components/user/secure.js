const auth = require('../../../auth')
const response = require('../../../network/response')

const checkAuth = (action) => {
  const middleware = (req, res, next) => {
    const owner = req.body.id
    switch (action) {
      case 'update':
        auth.check.own(req, owner) && response.success(req, res, `${req.body.name} editado`, 201)
        break
      default:
        next()
    }
  }
  return middleware
}

module.exports = checkAuth
