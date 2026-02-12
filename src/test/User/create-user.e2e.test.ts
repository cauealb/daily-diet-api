import request from 'supertest'
import { describe, it } from 'vitest'
import { app } from '../../app'

describe('Create User (E2E)', () => {


    it('should be able to create a new user', async () => {
        await request(app.server)
            .post('/user')
            .send({
                nome: "New User",
                altura: 1.69,
                peso: 54.7
            })
    })
})