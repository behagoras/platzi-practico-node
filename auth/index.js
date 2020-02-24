const jwt = require('jsonwebtoken')
const config = require('../config')
const error = require('../utils/error')
const { secret } = config.jwt

const sign = (data) => jwt.sign(data, secret)
const verify = (token) => jwt.verify(token, secret)

const check = {
  own: (req, owner) => {
    const decoded = decodeHeader(req)

    if (decoded.id !== owner) throw error('no puedes hacer ésto', 401)
    return (true)
  }
}

const getToken = (auth) => {
  if (!auth) throw error('No viene token', 400)
  if (auth.indexOf('Bearer ') === -1) throw error('Formato inválido', 400) // no tiene el formato "Bearer ñaslñaksjadsflkñjadsflñkfjdañlkjñlfajJWT"
  const token = auth.replace('Bearer ', '')
  return token
}

const decodeHeader = (req) => {
  const authorization = req.headers.authorization || ''
  const token = getToken(authorization)
  const decoded = verify(token)

  req.user = decoded
  return decoded
}

module.exports = {
  sign,
  verify,
  check
}
