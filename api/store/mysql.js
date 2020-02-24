const mysql = require('mysql')

const config = require('../../config')

const dbconf = {
  host: config.mysql.host,
  user: config.mysql.user,
  password: config.mysql.password,
  database: config.mysql.database
}

let connection

const handleConnection = () => {
  connection = mysql.createConnection(dbconf)
  connection.connect(error => {
    if (error) {
      console.error('[db error]', error)
      setTimeout(handleConnection, 2000)
    } else {
      console.log('db connected')
    }
  })

  connection.on('error', error => {
    console.error('[db error]', error)
    if (error.code === 'PROTOCOL_CONNECTION_LOST') {
      handleConnection()
    } else {
      throw error
    }
  })
}

handleConnection()

const list = async (table) => new Promise((resolve, reject) => {
  connection.query(`SELECT * FROM ${table}`, (error, data) => {
    if (error) { return reject(error) }
    resolve(data)
  })
})

const get = async (table, id) => new Promise((resolve, reject) => {
  connection.query(`SELECT * FROM ${table} WHERE id = '${id}'`, (error, data) => {
    if (error) { return reject(error) }
    resolve(data)
  })
})

const upsert = async (table, payload) => new Promise((resolve, reject) => {
  connection.query(`INSERT INTO ${table} SET ? ON DUPLICATE KEY UPDATE ?`, [payload, payload], (error, data) => {
    if (error) { return reject(error) }
    resolve(data)
  })
})

const remove = async (table, id) => true
const query = async (table, q) => new Promise((resolve, reject) => {
  connection.query(`SELECT * from ${table} WHERE ? `, q, (error, data) => {
    if (error) { return reject(error) }
    resolve(data[0] || null)
  })
})

module.exports = {
  list,
  get,
  upsert,
  remove,
  query
}
