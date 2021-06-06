
const Koa = require('koa')
const cors = require('koa2-cors')
const bodyparser = require('koa-bodyparser')

const {
  isProduct
} = require('./config')

const {
  performance,
  lastHandingErrors,
  getDbModel,
  createRouter
} = require('./middlewares')

const createApp = vbClient => {
  const app = new Koa()
  const router = createRouter(vbClient)

  !isProduct && app.use(performance)

  app
    .use(lastHandingErrors)
    .use(getDbModel)
    .use(cors({
      exposeHeaders: ['WWW-Authenticate', 'Server-Authorization', 'Date'],
      maxAge: 100,
      credentials: true,
      allowMethods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
      allowHeaders: ['Content-Type', 'Authorization', 'db', 'Accept', 'X-Custom-Header', 'anonymous', 'x-requested-with', 'origin', 'lang']
    }))
    .use(bodyparser({
      enableTypes: ['json', 'form', 'text']
    }))
    // .use(async (ctx, next) => {
    //   if (ctx.status === 403) {
    //     // 403 Forbidden
    //     throw Error(403)
    //   }
    //   await next()
    // })
    .use(router.routes())
    .use(router.allowedMethods())

  return app
}

module.exports = createApp
