const TABLE = 'post'
const nanoid = require('nanoid')

module.exports = (store = require('../../store/dummy')) => {
  const list = () => store.list(TABLE)
  const get = (id) => {
    const table = TABLE
    const where = { id }
    return store.get(table, where)
  }
  const upsert = async (user, body) => {
    const { id = nanoid(), text, user: userLogged } = body
    const post = { id, text, user }
    if (userLogged === user || user === undefined) { store.upsert(TABLE, post) }
  }
  return {
    list,
    get,
    upsert
  }
}
