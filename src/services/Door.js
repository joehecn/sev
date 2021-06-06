
const add = async (param, ctx) => {
  const res = new (ctx.model('Door'))(param)
  const created = await res.save()
  return created._doc
}

const remove = async (query, ctx) => {
  const res = await ctx.model('Door').deleteOne(query)
  return res
}

const update = async (query, set, ctx) => {
  const res = await ctx.model('Door').findOneAndUpdate(query, {
    $set: set
  }, { upsert: false, new: true })
  return res
}

const findOne = async (query, ctx) => {
  const res = await ctx.model('Door').findOne(query)
  return res
}

const list = async (query, ctx) => {
  const res = await ctx.model('Door').find(query)
  return res
}

module.exports = {
  add,
  remove,
  update,
  findOne,
  list
}
