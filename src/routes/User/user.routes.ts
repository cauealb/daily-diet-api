import { FastifyInstance } from "fastify";
import { db } from "../../database";
import { z } from "zod";
import { randomUUID } from "node:crypto";
import { VerifyCookieId } from "../../middleware/verify-cookie-id";

export async function UserRoutes(app: FastifyInstance) {
    app.post('/', async (request, replay) => {
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

        await db('Users').insert({
            Id: cookieId,
            Name: nome,
            Height: altura,
            Weight: peso
        })

        return replay.status(201).send({
            sucess: 'User created successfully!'
        })
    })

    app.get('/metrics', {
        preHandler: [VerifyCookieId]
    }, () => {
        // TODO
        // 1 - "Cookie" do usuário
        // 2 - Pegar o cookie, e ir até a tabela de refeições e procurar tudo que tem com aquele cookie, que é do usuário e mostrar as métricas
        // 3 - Pegar todas as refeições que é somente daquele usuário pedindo
        // 4 - Todas as 4 métricas exibidas

        // Pegar cookie
        // Chamar somente as refeições daquele cookie
        // Manipular dados e exibir as métricas
    })
}