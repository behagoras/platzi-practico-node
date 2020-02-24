require('dotenv').config()

const config = {
  api: {
    port: process.env.API_PORT || 3000
  },
  jwt: {
    secret: process.env.SECRET || 'laVidaEsBella*!'
  },
  mysql: {
    host: process.env.MYSQL_HOST || 'localhost',
    database: process.env.MYSQL_DATABASE || 'store',
    user: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_PASSWORD || ''
  }
}

module.exports = config
