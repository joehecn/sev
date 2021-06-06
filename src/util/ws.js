
module.exports = wss => {
  wss.on('connection', ws => {
    ws.on('message', message => {
      console.log({ message })
      ws.send('something0')
      ws.send('something1')
      ws.send('something2')
    })
  })
}
