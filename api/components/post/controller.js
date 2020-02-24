const TABLE = 'post'
const nanoid = require('nanoid')

module.exports = (store = require('../../store/dummy')) => {
  const list = () => store.list(TABLE)
  const get = (id) => {
    const table = TABLE
    const where = [{ id }]
    return store.get(table, where)
  }
  const upsert = async (user, body) => {
    const { id = nanoid(), text, user: userLogged } = body
    const post = { id, text, user }
    if (userLogged === user || user === undefined) { store.upsert(TABLE, post) }
  }

  const postsLiked = async (id) => {
    const table = `${TABLE}_like`
    const where = [{ user_liked: id }]
    const join = [{ user: 'user_liked' }, { post: 'post' }]
    return store.get(table, where, join)
  }

  const postLikers = async (user, post) => {
    const table = `${TABLE}_like`
    const where = [{ user_liked: user }, { post }]
    const join = [{ user: 'user_liked' }, { post: 'post' }]
    return store.get(table, where, join)
  }

  const like = async (user, post) => {
    console.log('user', user)
    console.log('post', post)
    const userLike = { user_liked: user, post }
    store.upsert(TABLE + '_like', userLike)
  }

  return {
    list,
    get,
    upsert,
    postsLiked,
    like,
    postLikers
  }
}
