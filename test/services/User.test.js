
const { closeConnection } = require('../../src/db/conn')
const { ctxMockAdmin } = require('../../testhelper/mock/ctx.js')
const { add, remove } = require('../../src/services/User.js')

afterAll(closeConnection)

describe('/services/User.js', () => {
  test('add and remove', async () => {
    // add
    const name = 'testservices'
    const { _id, userName } = await add({
      userName: name,
      password: '123123'
    }, ctxMockAdmin)
    expect(userName).toBe(name)
    // remove
    const removeRes = await remove({ _id }, ctxMockAdmin)
    expect(removeRes).toEqual({ n: 1, ok: 1, deletedCount: 1 })
  })
})
