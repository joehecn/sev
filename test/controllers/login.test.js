const supertest = require('supertest')
const { closeConnection } = require('../../src/db/conn')
const app = require('../../src/createApp')()

afterAll(closeConnection)

describe('/login', () => {
  it('200', async () => {
    const response = await supertest(app.callback())
      .post('/api/v1/login')
      .send({
        userName: 'admin',
        password: '123123'
      })

    // console.log(response.body.data)
    expect(response.statusCode).toBe(200)
    expect(response.body.code).toBe(0)
  })

  it('10001 - userName is required', async () => {
    const response = await supertest(app.callback())
      .post('/api/v1/login')
      .send({
        password: '123123'
      })

    expect(response.statusCode).toBe(403)
    expect(response.body).toEqual({ code: 10001, message: 'userName is required' })
  })

  it('10002 - password is required', async () => {
    const response = await supertest(app.callback())
      .post('/api/v1/login')
      .send({
        userName: 'admin'
      })

    expect(response.statusCode).toBe(403)
    expect(response.body).toEqual({ code: 10002, message: 'password is required' })
  })

  it('10003 - userName or password is error', async () => {
    const response = await supertest(app.callback())
      .post('/api/v1/login')
      .send({
        userName: 'admin',
        password: '111111'
      })

    expect(response.statusCode).toBe(403)
    expect(response.body).toEqual({ code: 10003, message: 'userName or password is error' })
  })
})
