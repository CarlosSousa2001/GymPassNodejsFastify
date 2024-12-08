// @vitest-environment ./src/vitest-environments-prisma/prisma.ts
import request from 'supertest';
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticated-user';
import { late } from 'zod';

describe('Nearby Gyms (e2e)', () => {

    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('should be able to list nearby gyms', async () => {

        const { token } = await createAndAuthenticateUser(app)

        await request(app.server)
            .post('/gyms')
            .set('Authorization', `Bearer ${token}`)
            .send({
                title: 'Gym 1',
                description: 'Gym 1 description',
                phone: '123456789',
                latitude: -27.2092052,
                longitude: -49.6401091,
            })

        await request(app.server)
            .post('/gyms')
            .set('Authorization', `Bearer ${token}`)
            .send({
                title: 'Gym 2',
                description: 'Gym 2 description',
                phone: '123456789',
                latitude: -27.0610928,
                longitude: -49.5229501,
            })

        const response = await request(app.server)
            .get('/gyms/nearby')
            .query({
                latitude: -27.2092052,
                longitude: -49.6401091,
            })
            .set('Authorization', `Bearer ${token}`)
            .send()

        expect(response.statusCode).toEqual(200)
        expect(response.body.gyms).toHaveLength(1)
        expect(response.body.gyms[0].title).toBe('Gym 1')
    })
});