// Punto de entrada de mi usario

const store = require('../../store/dummy')
const controller = require('./controller')

module.exports = controller(store)
