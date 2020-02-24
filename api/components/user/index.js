// Punto de entrada de mi usario

const store = require('../../store/mysql')
const controller = require('./controller')

module.exports = controller(store)
