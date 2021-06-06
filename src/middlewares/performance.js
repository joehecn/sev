
/**
 * 非生产环境下
 * 测试每次 http 请求的性能
 */
const performance = async (ctx, next) => {
  const start = new Date()

  await next()

  const ms = new Date() - start

  console.log(
    'performance 性能:',
    ctx.method,
    ctx.url,
    ctx.status,
    `消耗 - ${ms}ms`
  )
}

module.exports = performance
