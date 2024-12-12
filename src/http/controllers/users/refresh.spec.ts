// @vitest-environment ./src/vitest-environments-prisma/prisma.ts
import request from 'supertest';
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { app } from '@/app'

describe('Refresh token (e2e)', () => {

  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })


  it('The user should be able to refresh token', async () => {
    const signup = await request(app.server)
      .post('/users')
      .send({
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: '123456',
      })

    const authResponse = await request(app.server)
      .post('/sessions')
      .send({
        email: 'johndoe@example.com',
        password: '123456',
      })

      const cookies = authResponse.get('Set-Cookie') as string[]

      const response = await request(app.server)
        .patch('/token/refresh')
        .set('Cookie', cookies)
        .send()


    expect(response.status).toEqual(200);
    expect(response.body).toEqual({
      token: expect.any(String)
    })

    expect(response.get('Set-Cookie')).toEqual([expect.stringContaining('refreshToken=')])
})
});