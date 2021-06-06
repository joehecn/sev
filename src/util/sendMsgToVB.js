
const net = require('net')
const client = new net.Socket()

const sendMsgToVB = msg => {
  client.connect(4200, '127.0.0.1', () => {
    /* 向服务器发送数据 */
    client.write(msg)
  })
}

module.exports = sendMsgToVB
