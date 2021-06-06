
const add = async (param, ctx) => {
  const res = new (ctx.model('Card'))(param)
  const created = await res.save()
  return created._doc
}

const remove = async (query, ctx) => {
  const res = await ctx.model('Card').deleteOne(query)
  return res
}

const update = async (query, set, ctx) => {
  const res = await ctx.model('Card').findOneAndUpdate(query, {
    $set: set
  }, { upsert: false, new: false })
  return res
}

const findOne = async (query, ctx) => {
  const res = await ctx.model('Card').findOne(query)
  return res
}

const list = async (query, ctx) => {
  ctx.model('Door')
  const res = await ctx.model('Card')
    .find(query)
    .populate('doorIds').exec()
  return res
}

module.exports = {
  add,
  remove,
  update,
  findOne,
  list
}
