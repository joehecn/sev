
const getModel = require('../db/model.js')

const getDbModel = async (ctx, next) => {
  ctx.model = getModel
  if (next) {
    await next()
  }
}

module.exports = getDbModel
