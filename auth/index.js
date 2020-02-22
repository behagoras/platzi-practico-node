const jwt = require('jsonwebtoken')
const config = require('../config')
const { secret } = config.jwt

const sign = (data) => jwt.sign(data, secret)
const verify = (token) => jwt.verify(token, secret)

const check = {
  ownership: (req, owner) => {
    const decoded = decodeHeader(req)
    console.log(decoded)
  }
}

const getToken = (auth) => {
  if (!auth) throw new Error('No viene token')
  if (auth.indexOf('Bearer ') === -1) throw new Error('Formato inválido') // no tiene el formato "Bearer ñaslñaksjadsflkñjadsflñkfjdañlkjñlfajJWT"
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
