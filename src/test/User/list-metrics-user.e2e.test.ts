import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from 'supertest'
import { app } from "../../app";
import { beforeEach } from "node:test";
import { execSync } from "node:child_process";


describe('List Metrics User (E2E)', () => {
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

    it('should be able to list every user metrics', async () => {
        const responsePostCreateUser = await request(app.server)
            .post("/user")
            .send({
                nome: "New User",
                altura: 1.7,
                peso: 60.5,
        });

        const cookieId = responsePostCreateUser.header["set-cookie"];
        await request(app.server)
            .post("/meals")
            .set("Cookie", cookieId)
            .send({
                nome: "Meal",
                descricao: "Meal",
                estaNaDieta: true,
        });

        const responseGetMetrics = await request(app.server)
            .get('/user/metrics')
            .set('Cookie', cookieId)

        expect(responseGetMetrics.body).toEqual(
            expect.objectContaining({
                qtdMeals: 1,
                qtdMealsInTheDiet: 1,
                qtdMealsOutsideDiet: 0
            })
        )
    })
})