// Control all the logic of the user component
const nanoid = require('nanoid')
const auth = require('../auth')

const TABLE = 'user'

module.exports = (store = require('../../store/dummy')) => {
  const list = () => store.list(TABLE)
  const get = (id) => store.get(TABLE, id)

  const upsert = async (body) => {
    const { id = nanoid(), name, username, password } = body
    const user = { id, username, name, password }
    if (password && username) {
      await auth.upsert(user)
    }
    return store.upsert(TABLE, user)
  }

  const _delete = (id) => store.delete(TABLE, id)

  return {
    list,
    get,
    upsert,
    delete: _delete
  }
}
