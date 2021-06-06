
const path = require('path')
const { getConn } = require('./conn.js')

const schemaPath = path.resolve(__dirname, '../schemas/')

const models = {}

const _createModel = schemaName => {
  const Schema = require(`${schemaPath}/${schemaName}.js`)
  const conn = getConn()

  return conn.model(schemaName, Schema)
}

const getModel = schemaName => {
  if (!models[schemaName]) {
    models[schemaName] = _createModel(schemaName)
  }

  return models[schemaName]
}

module.exports = getModel
