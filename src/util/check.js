
const isString = value => {
  if (!value) return false
  if (typeof value !== 'string') return false

  return true
}

module.exports = {
  isString
}
