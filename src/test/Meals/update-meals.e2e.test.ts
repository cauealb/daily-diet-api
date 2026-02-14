import { afterAll, beforeAll, describe, it } from "vitest";
import request from "supertest";
import { app } from "../../app";
import { beforeEach } from "node:test";
import { execSync } from "node:child_process";

describe("Update Meals (E2E)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  beforeEach(() => {
    execSync("npm run knex -- migrate:rollback --all");
    execSync("npm run knex -- migrate:latest");
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to update a meal", async () => {
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

    const { body } = await request(app.server)
      .get("/meals")
      .set("Cookie", cookieId);

    const idMeal = body.meals[0].IdMeals;
    await request(app.server)
        .put(`/meals/${idMeal}`)
        .set('Cookie', cookieId)
        .send({
            nome: "Update Meal",
            descricao: "Update Meal",
            data: "14/02./2026",
            estaNaDieta: false
        })
        .expect(200)
  });
});
