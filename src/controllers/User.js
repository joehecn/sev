
const {
  getToken
} = require('../token/index.js')

const {
  asyncPbkdf2,
  findOne
} = require('../services/User')

const {
  isString
} = require('../util/check.js')

const _checkLoginArgs = (userName, password) => {
  // userName is required
  if (!isString(userName)) throw Error(10001)
  // password is required
  if (!isString(password)) throw Error(10002)
}
const login = async ctx => {
  const { userName, password } = ctx.request.body

  _checkLoginArgs(userName, password)

  const _password = await asyncPbkdf2(password.trim())
  const query = { userName, password: _password }

  const { _id } = await findOne(query, ctx)

  const { token } = await getToken(_id)

  ctx.body = {
    code: 0,
    message: '',
    data: {
      token,
      user: {
        userName
      }
    }
  }
}

module.exports = {
  login
}
