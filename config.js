const config = {
  api: {
    port: process.env.API_PORT || 3000
  },
  jwt: {
    secret: process.env.SECRET || 'laVidaEsBella*!'
  }
}

module.exports = config
