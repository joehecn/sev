const supertest = require('supertest')
const { closeConnection } = require('../../src/db/conn')
const app = require('../../src/createApp')()
const token = require('../../testhelper/token.json')

afterAll(closeConnection)

describe('/door', () => {
  it('/detail 200', async () => {
    const response = await supertest(app.callback())
      .get('/api/v1/door/detail')
      .set('Authorization', token.admin)
      .query({
        _id: '60bbc8682a929d53cf7368d4'
      })

    // console.log(response.body.data)
    expect(response.statusCode).toBe(200)
    expect(response.body.code).toBe(0)
  })

  it('/list 403 no token', async () => {
    const response = await supertest(app.callback())
      .get('/api/v1/door/list')

    expect(response.statusCode).toBe(403)
    expect(response.body).toEqual({ code: 10004, message: 'no token' })
    // console.log(response.body.data)
    // expect(response.statusCode).toBe(200)
    // expect(response.body.code).toBe(0)
  })

  it('/list 200', async () => {
    const response = await supertest(app.callback())
      .get('/api/v1/door/list')
      .set('Authorization', token.admin)

    // console.log(response.body.data)
    expect(response.statusCode).toBe(200)
    expect(response.body.code).toBe(0)
  })
})
