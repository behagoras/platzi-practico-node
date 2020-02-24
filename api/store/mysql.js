const mysql = require('mysql')

const config = require('../../config')

const dbConf = {
  host: config.mysql.host,
  user: config.mysql.user,
  password: config.mysql.password,
  database: config.mysql.database
}

let connection

const handleConnection = () => {
  connection = mysql.createConnection(dbConf)
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

const get = async (table, where, join) => new Promise((resolve, reject) => {
  let joinQuery = ''
  if (join) {
    join.forEach((element, i) => {
      console.log(element)
      const key = Object.keys(element)[0]
      const val = element[key]
      joinQuery += ` JOIN ${key} ON ${table}.${val} = ${key}.id`
    })
  }
  connection.query(`SELECT * FROM ${table} ${joinQuery} WHERE ?`, where, (error, data) => {
    if (error) { return reject(error) }
    console.log(data)
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
