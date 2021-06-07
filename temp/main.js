/**
 * 构建TCP服务端
 */

/* 引入net模块 */
const net = require('net')

/* 创建TCP服务器 */
const server = net.createServer()

/* 设置监听端口 */
server.listen(8000, () => {
  /* 获取地址信息，得到的是一个json { address: '::', family: 'IPv6', port: 8000 } */
  const address = server.address()
  console.log(address)
  /* TCP服务器监听的端口号 */
  console.log('the port of server is ' + address.port)
  /* TCP服务器监听的地址 */
  console.log('the address of server is ' + address.address)
  /* 说明TCP服务器监听的地址是 IPv6 还是 IPv4 */
  console.log('the family of server is ' + address.family)
})

server.maxConnections = 32

server.on('connection', socket => {
  console.log('---- someone connects')
  console.log('socket.remoteAddress:', socket.remoteAddress)
  console.log('socket.remotePort:', socket.remotePort)
  console.log('socket.localAddress:', socket.localAddress)
  console.log('socket.localPort', socket.localPort)

  /* 设置最大连接数量 */
  server.getConnections((err, count) => {
    if (err) console.log(err)
    console.log(`最大: ${server.maxConnections}, 现在: ${count}`)
    socket.write(`最大: ${server.maxConnections}, 现在: ${count}`)
  })

  /* 获取地址信息 */
  const address = server.address()
  const message = 'the server address is ' + JSON.stringify(address)

  // 发送数据
  socket.write(message, () => {
    const writeSize = socket.bytesWritten
    console.log(message + ' has send')
    console.log('the size of message is ' + writeSize)
  })

  /* 监听data事件 */
  socket.on('data', data => {
    console.log(data)
    console.log(data.toString())
    const readSize = socket.bytesRead
    console.log('the size of data is ' + readSize)
  })
})

/* 设置监听时的回调函数 */
server.on('listening', () => {
  console.log('Creat server on http://127.0.0.1:8000/')
})

/* 设置关闭时的回调函数 */
server.on('close', () => {
  console.log('server closed!')
})

/* 设置错误时的回调函数 */
server.on('error', error => {
  console.log('---- error:')
  console.log(error)
})
