// Control all the logic of the user component

const nanoid = require('nanoid')
const TABLE = 'user'

module.exports = (injectedStore = require('../../store/dummy')) => {
  const list = () => injectedStore.list(TABLE)
  const get = (id) => injectedStore.get(TABLE, id)
  const upsert = (body) => {
    const { id = nanoid(), name } = body
    const user = { id, name }
    return injectedStore.upsert(TABLE, user)
  }
  const _delete = (id) => injectedStore.delete(TABLE, id)

  module.exports = {
    list,
    get,
    upsert,
    delete: _delete
  }
}
