
const { closeConnection } = require('../../src/db/conn')
const { ctxMockAdmin } = require('../../testhelper/mock/ctx.js')
const { add, update, remove } = require('../../src/services/Door.js')

afterAll(closeConnection)

describe('/services/Door.js', () => {
  test.skip('add', async () => {
    const res = await add({
      doorNo: 'doorNo',
      building: 'building',
      unit: 'unit'
    }, ctxMockAdmin)
    console.log(res)
    expect(1).toBe(1)
  })

  test('add, update and remove', async () => {
    // add
    const name = 'testservices'
    const { _id, doorNo } = await add({
      doorNo: name,
      building: name,
      unit: name
    }, ctxMockAdmin)
    expect(doorNo).toBe(name)

    const name2 = 'testservices1'
    const res = await update({ _id }, { doorNo: name2 }, ctxMockAdmin)
    expect(res.doorNo).toBe(name2)
    // remove
    const removeRes = await remove({ _id }, ctxMockAdmin)
    expect(removeRes).toEqual({ n: 1, ok: 1, deletedCount: 1 })
  })
})
