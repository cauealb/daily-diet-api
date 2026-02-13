import request from 'supertest';
import { it, describe, beforeAll, afterAll, beforeEach, expect } from 'vitest';
import { app } from '../../app';
import { exec } from 'node:child_process';

describe('List Meals (E2E)', () => {
    beforeAll(async () => {
        await app.ready()
    })

    beforeEach(async () => {
        exec("npm run knex -- migrate:rollback --all")
        exec("npm run knex -- migrate:latest")
    })

    afterAll(async () => {
        await app.close()
    })

    it('should be able to list meals', async () => {
        const responsePostCreateUser = await request(app.server)
            .post('/user')
            .send({
                nome: "New User",
                altura: 1.70,
                peso: 60.5
            })

        const cookieId = responsePostCreateUser.header['set-cookie']

        await request(app.server)
            .post('/meals')
            .set('Cookie', cookieId)
            .send({
                nome: "Meal",
                descricao: "Meal",
                estaNaDieta: true
            })

        const responseGetMeals = await request(app.server)
            .get('/meals')
            .set('Cookie', cookieId)

        expect(responseGetMeals.body.meals[0]).toEqual(
            expect.objectContaining({
                Name: "Meal",
                Description: 'Meal',
                ItsOnTheDiet: 1,
            })
        )
    })
})