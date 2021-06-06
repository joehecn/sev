
const { closeConnection } = require('../../src/db/conn')
const { ctxMockAdmin } = require('../../testhelper/mock/ctx.js')
const { add, update, remove } = require('../../src/services/CardHistory.js')

afterAll(closeConnection)

describe('/services/CardHistory.js', () => {
  test.skip('add', async () => {
    const res = await add({
      cardId: '60bbdf2036bc0c5f6d5181a8',
      cardNo: 'cardNo',
      doorIds: ['60bbc8682a929d53cf7368d4'],
      username: 'username',
      realname: 'realname',
      userInfo: 'userInfo'

    }, ctxMockAdmin)
    console.log(res)
    expect(1).toBe(1)
  })

  test('add, update and remove', async () => {
    // add
    const name = 'testservices'
    const { _id, cardNo } = await add({
      cardId: '60bbdf2036bc0c5f6d5181a8',
      cardNo: name,
      doorIds: ['60bbc8682a929d53cf7368d4'],
      username: name,
      realname: name,
      userInfo: name
    }, ctxMockAdmin)
    expect(cardNo).toBe(name)

    const name2 = 'testservices1'
    const res = await update({ _id }, { cardNo: name2 }, ctxMockAdmin)
    expect(res.cardNo).toBe(name2)
    // remove
    const removeRes = await remove({ _id }, ctxMockAdmin)
    expect(removeRes).toEqual({ n: 1, ok: 1, deletedCount: 1 })
  })
})
