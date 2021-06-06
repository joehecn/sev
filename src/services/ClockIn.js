
const add = async (param, ctx) => {
  const res = new (ctx.model('ClockIn'))(param)
  const created = await res.save()
  return created._doc
}

const remove = async (query, ctx) => {
  const res = await ctx.model('ClockIn').deleteOne(query)
  return res
}

const update = async (query, set, ctx) => {
  const res = await ctx.model('ClockIn').findOneAndUpdate(query, {
    $set: set
  }, { upsert: false, new: true })
  return res
}

const findOne = async (query, ctx) => {
  const res = await ctx.model('ClockIn').findOne(query)
  return res
}

const list = async (query, ctx) => {
  const res = await ctx.model('ClockIn').find(query)
  return res
}

module.exports = {
  add,
  remove,
  update,
  findOne,
  list
}
