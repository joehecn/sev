
const ERRORS = require('./errors.js')

const NODE_ENV = process.env.NODE_ENV
const dbHost = 'mongodb://localhost:27017/'

// jwt
const PASSWORD_SALT = 'salt for one punch, which is salty'
// const JWT_EXPIRE = 365 * 24 * 60 * 60 * 1000 // jwt有效期：1年
// const JWT_EXPIRE = 60 * 1000 // jwt有效期：1分钟
const JWT_EXPIRE = 15 * 24 * 60 * 60 * 1000 // jwt有效期：15天
const JWT_SECRET = 'you can never image such a long secret for a json web token'

const getDbConnectStr = dbName => {
  return `${dbHost}${dbName}`
}

module.exports = {
  isProduct: NODE_ENV === 'product',
  isMac: NODE_ENV === 'macos',
  // jwt
  PASSWORD_SALT,
  JWT_EXPIRE,
  JWT_SECRET,

  ERRORS,

  getDbConnectStr
}
