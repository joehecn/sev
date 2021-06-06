
const net = require('net')

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

class VBClient {
  constructor () {
    this.client = null
  }

  async init () {
    this.client = await this.createClient()
  }

  async replaceConnect () {
    await sleep(3000)
    this.client = await this.createClient()
  }

  createClient () {
    return new Promise((resolve, reject) => {
      const client = new net.Socket()

      client.on('error', reject)

      client.on('close', () => {
        console.log('---- client closed')
        this.replaceConnect()
      })

      client.connect(4200, '127.0.0.1', () => {
        resolve(client)
      })
    })
  }

  sendMsgToVB (msg) {
    this.client && this.client.write && this.client.write(msg)
  }
}

module.exports = VBClient
