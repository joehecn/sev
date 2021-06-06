const supertest = require('supertest')
const { closeConnection } = require('../../src/db/conn')
const app = require('../../src/createApp')()
const token = require('../../testhelper/token.json')

afterAll(closeConnection)

describe('/card', () => {
  it('/detail 200', async () => {
    const response = await supertest(app.callback())
      .get('/api/v1/card/detail')
      .set('Authorization', token.admin)
      .query({
        _id: '60bbdf2036bc0c5f6d5181a8'
      })

    // console.log(response.body.data)
    expect(response.statusCode).toBe(200)
    expect(response.body.code).toBe(0)
  })

  it('/list 200', async () => {
    const response = await supertest(app.callback())
      .get('/api/v1/card/list')
      .set('Authorization', token.admin)

    // console.log(response.body.data)
    expect(response.statusCode).toBe(200)
    expect(response.body.code).toBe(0)
  })
})
