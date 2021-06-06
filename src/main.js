
const VBClient = require('./util/vbClient')
const createApp = require('./createApp')
const { isMac } = require('./config')

const main = async () => {
  const vbClient = new VBClient()

  if (!isMac) {
    await vbClient.init()
  }

  const app = createApp(vbClient)
  app.listen(4002)
}

main().then(() => console.log('server is runing at 4002')).catch(error => {
  console.log('---- main catch error')
  console.error(error)
})
