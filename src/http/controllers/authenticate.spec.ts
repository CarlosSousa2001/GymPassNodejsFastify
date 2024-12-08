// @vitest-environment ./src/vitest-environments-prisma/prisma.ts
import request from 'supertest';
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { app } from '@/app'

describe('Register (e2e)', () => {

  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to register', async () => {
    const response = await request(app.server)
      .post('/users')
      .send({
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: '123456',
      })

    expect(response.status).toBe(201);
  });

  it('The user should be able to successfully authenticate', async () => {
    const signup = await request(app.server)
      .post('/users')
      .send({
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: '123456',
      })

    const response = await request(app.server)
      .post('/sessions')
      .send({
        email: 'johndoe@example.com',
        password: '123456',
      })

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      token: expect.any(String)
    })
  })
});