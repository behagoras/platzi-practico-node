const auth = require('../../../auth')

const checkAuth = (action) => {
  const middleware = (req, res, next) => {
    const owner = req.body.id
    switch (action) {
      case 'update':
        auth.check.ownership(req, owner)
        break
      default:
        next()
    }
  }
  return middleware
}

module.exports = checkAuth
