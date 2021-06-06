
const crypto = require('crypto')
const { PASSWORD_SALT } = require('../config/index.js')

const asyncPbkdf2 = password => {
  return new Promise((resolve, reject) => {
    crypto.pbkdf2(password, PASSWORD_SALT, 512, 128, 'sha1', (err, derivedKey) => {
      if (err) {
        reject(err)
      } else {
        resolve(derivedKey.toString())
      }
    })
  })
}

const add = async (param, ctx) => {
  const _password = await asyncPbkdf2(param.password.trim())
  param.password = _password

  const res = new (ctx.model('User'))(param)
  const created = await res.save()
  return created._doc
}

const remove = async (query, ctx) => {
  const res = await ctx.model('User').deleteOne(query)
  return res
}

/**
 * user login
 * @param {String} userName
 * @param {String} password
 */
const findOne = async (query, ctx) => {
  const res = await ctx.model('User').findOne(query, {
    password: 0
  })

  // userName or password is error
  if (!res) throw Error(10003)

  return res
}

module.exports = {
  add,
  remove,
  // update,
  asyncPbkdf2,
  findOne
  // list
}
