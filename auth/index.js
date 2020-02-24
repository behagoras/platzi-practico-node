const jwt = require('jsonwebtoken')
const config = require('../config')
const error = require('../utils/error')
const { secret } = config.jwt

const sign = (data) => jwt.sign(JSON.stringify(data), secret)
const verify = (token) => jwt.verify(token, secret)

const check = {
  own: (req, owner) => {
    const decoded = decodeHeader(req)

    if (decoded.id !== owner) throw error('no puedes hacer ésto', 401)
    return (true)
  },
  logged: (req) => {
    const decoded = decodeHeader(req)
    if (!decoded.id) throw error('Necesitas ingresar para seguir a alguien', 401)
    return (true)
  },
  getId: (req) => {
    const decoded = decodeHeader(req)
    if (!decoded.id) throw error('Necesitas ingresar para seguir editar una publicación', 401)
    return (decoded.id)
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
