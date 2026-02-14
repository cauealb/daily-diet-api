import { afterAll, beforeAll, describe, it } from "vitest";
import request from 'supertest'
import { app } from "../../app";
import { beforeEach } from "node:test";
import { execSync } from "node:child_process";


describe('Create Meals (E2E)', () => {
    
    beforeAll(async () => {
        await app.ready()
    })

    beforeEach(() => {
        execSync("npm run knex -- migrate:rollback --all")
        execSync("npm run knex -- migrate:latest")
    })

    afterAll(async () => {
        await app.close()
    })

    it('should be able to crate a new meal', async () => {
        const responsePostUser = await request(app.server)
            .post('/user')
            .send({
                nome: "New User",
                altura: 1.70,
                peso: 60.5
            })

        const cookieId = responsePostUser.header['set-cookie']
        
        await request(app.server)
            .post('/meals')
            .set('Cookie', cookieId)
            .send({
                nome: "Meal",
                descricao: "Meal",
                estaNaDieta: true
            })
            .expect(201)
    })
})