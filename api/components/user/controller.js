// Control all the logic of the user component
const nanoid = require('nanoid')
const auth = require('../auth')

const TABLE = 'user'

module.exports = (store = require('../../store/dummy')) => {
  const list = () => store.list(TABLE)
  const get = (id) => {
    const table = TABLE
    const where = [{ id }]
    return store.get(table, where)
  }

  const upsert = async (body) => {
    const { id = nanoid(), name, username, password } = body
    const user = { id, username, name }
    const authUser = { id, username, password }
    if (password && username) {
      await auth.upsert(authUser)
    }
    return store.upsert(TABLE, user)
  }

  const follow = (from, to) => {
    const table = `${TABLE}_follow`
    const payload = { user_from: from, user_to: to }
    return store.upsert(table, payload)
  }

  const followers = (id) => {
    const table = `${TABLE}_follow`
    const where = [{ user_from: id }]
    const join = [{ user: 'user_to' }]
    return store.get(table, where, join)
  }

  const _delete = (id) => store.delete(TABLE, id)

  return {
    list,
    get,
    upsert,
    delete: _delete,
    follow,
    followers
  }
}
