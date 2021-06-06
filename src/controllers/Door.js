
const {
  add: _add,
  remove: _remove,
  update: _update,
  findOne: _findOne,
  list: _list
} = require('../services/Door')

const add = async ctx => {
  const param = ctx.request.body
  // console.log({ param })
  const data = await _add(param, ctx)

  ctx.body = {
    code: 0,
    message: '',
    data
  }
}

const remove = async ctx => {
  const query = ctx.request.body
  // console.log({ query })
  const data = await _remove(query, ctx)

  ctx.body = {
    code: 0,
    message: '',
    data
  }
}

const update = async ctx => {
  const param = ctx.request.body
  // console.log({ param })
  const _id = param._id
  const data = await _update({ _id }, param, ctx)

  ctx.body = {
    code: 0,
    message: '',
    data
  }
}

const findOne = async ctx => {
  const query = ctx.request.query
  const data = await _findOne(query, ctx)

  ctx.body = {
    code: 0,
    message: '',
    data
  }
}

const list = async ctx => {
  const query = ctx.request.query
  const data = await _list(query, ctx)

  ctx.body = {
    code: 0,
    message: '',
    data
  }
}

module.exports = {
  add,
  remove,
  update,
  findOne,
  list
}
