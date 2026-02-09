import { FastifyInstance } from "fastify";
import { VerifyCookieId } from "../../middleware/verify-cookie-id";

export async function MealsRoutes(app: FastifyInstance) {
    app.addHook('preHandler', VerifyCookieId);
}