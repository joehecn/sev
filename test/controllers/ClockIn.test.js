const supertest = require('supertest')
const { closeConnection } = require('../../src/db/conn')
const app = require('../../src/createApp')()
const token = require('../../testhelper/token.json')

afterAll(closeConnection)

describe('/clockin', () => {
  it('/detail 200', async () => {
    const response = await supertest(app.callback())
      .get('/api/v1/clockin/detail')
      .set('Authorization', token.admin)
      .query({
        _id: '60bbe1d41595456031fd10ef'
      })

    // console.log(response.body.data)
    expect(response.statusCode).toBe(200)
    expect(response.body.code).toBe(0)
  })

  it('/list 200', async () => {
    const response = await supertest(app.callback())
      .get('/api/v1/clockin/list')
      .set('Authorization', token.admin)

    // console.log(response.body.data)
    expect(response.statusCode).toBe(200)
    expect(response.body.code).toBe(0)
  })
})
