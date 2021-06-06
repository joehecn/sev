
const Router = require('@koa/router')
const { login } = require('../controllers/User')
const jwt = require('./jwt')
const door = require('../controllers/Door')
const card = require('../controllers/Card')
const history = require('../controllers/CardHistory')
const clockin = require('../controllers/ClockIn')
const emitter = require('../util/emitter')

let index = 0

const send = (vbClient, querystring) => {
  return new Promise((resolve, reject) => {
    const t = `${Date.now()}_${index++}`

    emitter.once(t, data => {
      console.log({ data })
      if (data.message) {
        reject(data)
        return
      }

      resolve(data)
    })

    vbClient && vbClient.sendMsgToVB(`${querystring}&t=${t}`)
  })
}

const createRouter = vbClient => {
  const router = new Router()

  router
    // 网站根目录
    .get('/', ctx => {
      ctx.body = 'server is runing'
    })

    .post('/api/v1/login', login)

    .put('/api/v1/door/add', jwt, door.add)
    .delete('/api/v1/door/remove', jwt, door.remove)
    .post('/api/v1/door/update', jwt, door.update)
    .get('/api/v1/door/detail', jwt, door.findOne)
    .get('/api/v1/door/list', jwt, door.list)

    .put('/api/v1/card/add', jwt, card.add)
    .delete('/api/v1/card/remove', jwt, card.remove)
    .post('/api/v1/card/update', jwt, card.update)
    .get('/api/v1/card/detail', jwt, card.findOne)
    .get('/api/v1/card/list', jwt, card.list)

    .put('/api/v1/history/add', jwt, history.add)
    // .delete('/api/v1/history/remove', jwt, history.remove)
    // .post('/api/v1/history/update', jwt, history.update)
    .get('/api/v1/history/detail', jwt, history.findOne)
    .get('/api/v1/history/list', jwt, history.list)

    .put('/api/v1/clockin/add', jwt, clockin.add)
    // .delete('/api/v1/clockin/remove', jwt, clockin.remove)
    // .post('/api/v1/clockin/update', jwt, clockin.update)
    .get('/api/v1/clockin/detail', jwt, clockin.findOne)
    .get('/api/v1/clockin/list', jwt, clockin.list)

    .get('/api/v1/vue_api', jwt, async ctx => {
      const data = await send(vbClient, ctx.querystring)
      ctx.body = {
        code: 0,
        data
      }
    })

    .get('/api/v1/vb_state', ctx => {
      const { t } = ctx.query
      emitter.emit(t, ctx.query)
      ctx.body = 'vb_state'
    })

  return router
}

module.exports = createRouter
