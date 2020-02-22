// Punto de entrada de mi capa de autenticación

const store = require('../../store/dummy')
const controller = require('./controller')

module.exports = controller(store)
