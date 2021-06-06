
const Event = require('events')

class Emitter extends Event {}

const emitter = new Emitter()

module.exports = emitter
