const db = {
  user: [
    { id: '1', username: 'David', password: '$2b$05$OmdDggo0WSm2l5ujy02IeuvkwRtUsb1RcbUJ4RHCg7TP2au1lLc0y' },
    { id: '2', username: 'Fernando', password: '$2b$05$OmdDggo0WSm2l5ujy02IeuvkwRtUsb1RcbUJ4RHCg7TP2au1lLc0y' },
    { id: '3', username: 'Xavier', password: '$2b$05$OmdDggo0WSm2l5ujy02IeuvkwRtUsb1RcbUJ4RHCg7TP2au1lLc0y' },
    {
      id: 'awDdGm-_kG0TLfxdioGv_',
      username: 'behagoras',
      password: '$2b$05$6jIYMTeRiFXH5gqRH9U2i.H53lnS/cOn6rai2PSBuI5JuLXUJdmA2'
    }
  ],
  auth: [
    {
      id: 'awDdGm-_kG0TLfxdioGv_',
      username: 'behagoras',
      password: '$2b$05$6jIYMTeRiFXH5gqRH9U2i.H53lnS/cOn6rai2PSBuI5JuLXUJdmA2'
    }
  ]
}

const list = async (table) => db[table] || []

const get = async (table, id) => {
  const collection = await list(table)
  return collection.filter(item => item.id === id[0] || null)
}

const upsert = async (table, payload) => {
  db[table] = db[table] || []
  db[table].push(payload)
  console.log(db)
}
const remove = async (table, id) => true

const query = async (table, q) => {
  const collection = await list(table)
  const keys = Object.keys(q)
  const key = keys[0]

  const filteredItem = collection.filter((item) => item[key] === q[key]) // Regresa un arreglo de los objetos encontrados comparando el query vs el item

  console.log('filteredItem', filteredItem)

  return filteredItem[0] || []
}

module.exports = {
  list,
  get,
  upsert,
  remove,
  query
}
