
const path = require('path')
const fs = require('fs')
const rootPath = process.cwd()

const errorFile = path.resolve(rootPath, 'logs/error.log')
const errorLog = fs.createWriteStream(errorFile, { flags: 'a' })

const write = (writer, message) => {
  // return a promise only when we get a drain
  if (!writer.write(message)) {
    return new Promise(resolve => {
      writer.once('drain', resolve)
    })
  }
}

const writeErr = async obj => {
  const message = `
${new Date()}
----------------------------------------------------------
${JSON.stringify(obj.ctx, null, 2)}
-----------------------------
  ${obj.stack}

`

  const promise = write(errorLog, message)
  // since drain happens rarely, awaiting each write call is really slow.
  if (promise) {
    // we got a drain event, therefore we wait
    await promise
  }
}

module.exports = {
  writeErr
}
