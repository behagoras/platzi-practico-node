// Control all the logic of the user component
const nanoid = require('nanoid')
const auth = require('../auth')

const TABLE = 'user'

module.exports = (injectedStore = require('../../store/dummy')) => {
  const list = () => injectedStore.list(TABLE)
  const get = (id) => injectedStore.get(TABLE, id)

  const upsert = async (body) => {
    const { id = nanoid(), name, username, password } = body
    const user = { id, username, name, password }
    if (password && username) {
      await auth.upsert(user)
    }
    return injectedStore.upsert(TABLE, user)
  }

  const _delete = (id) => injectedStore.delete(TABLE, id)

  return {
    list,
    get,
    upsert,
    delete: _delete
  }
}
