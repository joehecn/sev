
const token = require('../token.json')
const getModel = require('../../src/db/model.js')

const ctxMockAnonymousUser = {
  model: getModel
}
const ctxMockAdmin = {
  header: {
    authorization: token.admin
  },
  model: getModel
}

module.exports = {
  ctxMockAnonymousUser,
  ctxMockAdmin
}
