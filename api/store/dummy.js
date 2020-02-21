const db = {
  user: [
    { id: '1', name: 'David' },
    { id: '2', name: 'Fernando' },
    { id: '3', name: 'Xavier' }
  ]
}

const list = async (table) => db[table]

const get = async (table, id) => {
  const collection = await list(table)
  return collection.filter(item => item.id === id[0] || null)
}

const upsert = async (table, payload) => {
  db[table].push(payload)
  // return payload // Para regresar el elemento agregado
  return db // opara ver que se agregó
}
const remove = async (table, id) => true

module.exports = {
  list,
  get,
  upsert,
  remove
}
