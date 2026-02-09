import { FastifyInstance } from "fastify";
import { UserRoutes } from "./User/user.routes";
import { MealsRoutes } from "./Meals/meals.routes";

export async function Routes(app: FastifyInstance) {
    app.register(UserRoutes, { prefix: 'user' });
    app.register(MealsRoutes, { prefix: 'meals' })
}