// Control all the logic of the user component
const TABLE = 'auth'
const auth = require('../../../auth')

module.exports = (store = require('../../store/dummy')) => {
  const login = async (username, password) => {
    const data = await store.query(TABLE, { username: username })

    if (data.password === password) {
      console.log('auth.sign(data)', auth.sign(data))
      console.log('auth', auth)
      console.log('data', data)
      return auth.sign(data)
    } else {
      throw new Error('Información inválida')
    }
  }

  const upsert = (data) => {
    const {
      id,
      username = null,
      password = null
    } = data

    const authData = {
      id,
      username,
      password
    }

    return store.upsert(TABLE, authData)
  }

  return {
    upsert,
    login
  }
}
