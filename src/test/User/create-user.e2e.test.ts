import request from 'supertest'
import { describe, it, beforeAll, beforeEach, afterAll } from 'vitest'
import { app } from '../../app'
import { exec } from 'node:child_process'

describe('Create User (E2E)', () => {

    beforeAll( async() => {
        await app.ready()
    })

    beforeEach(async () => {
        exec("npm run knex -- migrate:rollback --all")
        exec("npm run knex -- migrate:latest")
    })

    afterAll(async () => {
        await app.close()
    })

    it('should be able to create a new user', async () => {
        await request(app.server)
            .post('/user')
            .send({
                nome: "New User",
                altura: 1.70,
                peso: 60.5
            })
            .expect(201)
    })
})