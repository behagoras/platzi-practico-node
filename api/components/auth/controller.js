// Control all the logic of the user component
const bcrypt = require('bcrypt')
const TABLE = 'auth'
const auth = require('../../../auth')

module.exports = (store = require('../../store/dummy')) => {
  const login = async (username, password) => {
    const data = await store.query(TABLE, { username: username })

    return bcrypt.compare(password, data.password)
      .then((equals) => {
        if (equals) {
          return auth.sign(data)
        } else {
          throw new Error('Información inválida')
        }
      })
  }

  const upsert = async (data) => {
    const {
      id,
      username = null,
      password = null
    } = data

    const authData = {
      id,
      username,
      password: await bcrypt.hash(password, 5)
    }

    return store.upsert(TABLE, authData)
  }

  return {
    upsert,
    login
  }
}
