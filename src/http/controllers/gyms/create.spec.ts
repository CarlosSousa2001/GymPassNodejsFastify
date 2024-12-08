// @vitest-environment ./src/vitest-environments-prisma/prisma.ts
import request from 'supertest';
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticated-user';

describe('Create Gym (e2e)', () => {

    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('should be able to create a gym', async () => {


        const { token } = await createAndAuthenticateUser(app)

        const profileResponse = await request(app.server)
            .post('/gyms')
            .set('Authorization', `Bearer ${token}`)
            .send({
                title: 'Gym 1',
                description: 'Gym 1 description',
                phone: '123456789',
                latitude: -27.2092052,
                longitude: -49.6401091
            })

        expect(profileResponse.status).toBe(201)
    })
});