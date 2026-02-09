import { FastifyInstance } from "fastify";
import { UserRoutes } from "./User/user.routes";

export async function Routes(app: FastifyInstance) {
    app.register(UserRoutes, { prefix: 'user'})
}