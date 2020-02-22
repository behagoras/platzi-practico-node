const db = {
  user: [
    { id: '1', name: 'David' },
    { id: '2', name: 'Fernando' },
    { id: '3', name: 'Xavier' }
  ]
}

const list = async (table) => db[table] || []

const get = async (table, id) => {
  const collection = await list(table)
  return collection.filter(item => item.id === id[0] || null)
}

const upsert = async (table, payload) => {
  db[table] = db[table] || []
  const index = db[table].push(payload)
  // console.log(index)
  // return get(table, index)
  // console.log(db)
  // return payload // Para regresar el elemento agregado
  // return db // opara ver que se agregó
}
const remove = async (table, id) => true

const query = async (table, q) => {
  const collection = await list(table)
  const keys = Object.keys(q)
  const key = keys[0]

  const filteredItem = collection.filter((item) => item[key] === q[key]) // Regresa un arreglo de los objetos encontrados comparando el query vs el item

  return filteredItem[0] || []
}

module.exports = {
  list,
  get,
  upsert,
  remove,
  query
}
