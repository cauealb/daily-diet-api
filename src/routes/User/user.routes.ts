import { FastifyInstance } from "fastify";
import { db } from "../../database";
import { z } from "zod";
import { randomUUID } from "node:crypto";

export async function UserRoutes(app: FastifyInstance) {
    app.post('/', async (request, replay) => {
        // 1 - Body
        // 2 - Criar no banco de dados um novo usuário
        // 3 - Nome, peso e altura não podem estar vazias
        // 4 - Usuário novo

        // Pegar o body - x
        // validar com o zod - x
        // Criar e setar cookies - x
        // Criar no banco de dados

        const bodyShema = z.object({
            nome: z.string(),
            altura: z.number(),
            peso: z.number()
        })

        const { nome, altura, peso } = bodyShema.parse(request.body);

        let cookieId = request.headers.cookie
        if (cookieId) {
            return replay.status(403).send({
                err: "You already have an active user."
            })
        }

        cookieId = randomUUID()
        replay.setCookie('cookieId', cookieId, {
            path: '/',
            maxAge: 60 * 60 * 24 * 7 // 7 dias
        })

        await db('users')
    })
}