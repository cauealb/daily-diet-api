import { FastifyInstance } from "fastify";
import { VerifyCookieId } from "../../middleware/verify-cookie-id";
import { z } from "zod";
import { db } from "../../database";
import { randomUUID } from "crypto";

export async function MealsRoutes(app: FastifyInstance) {
    app.addHook('preHandler', VerifyCookieId);

    app.post('/', async (request, replay) => {
        const bodySchema = z.object({
            nome: z.string(),
            descricao: z.string(),
            estaNaDieta: z.boolean().optional().default(false)
        })

        const { nome, descricao, estaNaDieta } = bodySchema.parse(request.body);
        const cookieId = request.headers.cookie?.split('=')[1]

        await db('Meals').insert({
            IdMeals: randomUUID(),
            Name: nome, 
            Description: descricao,
            ItsOnTheDiet: estaNaDieta,
            IdUser: cookieId
        })
        
        return replay.status(201).send({
            sucess: 'Meals created successfully!'
        })
    });

    app.get('/', async (request) => {
        const cookieId = request.headers.cookie?.split('=')[1]

        const meals = await db('Meals').where('IdUser', cookieId).select();
        return { meals }
    })

    app.get('/:id', async (request) => {
        const paramsSchema = z.object({ id: z.uuid() });
        const { id } = paramsSchema.parse(request.params)

        const cookieid = request.headers.cookie?.split('=')[1];

        const meal = await db('Meals').where({ idUser: cookieid, idMeals: id })
        return { meal }
    })

    app.delete('/:id', async (request, replay) => {
        const paramsSchema = z.object({ id: z.uuid() })
        const { id } = paramsSchema.parse(request.params)

        const cookieId = request.headers.cookie?.split('=')[1]

        await db('Meals').where({ idMeals: id, idUser: cookieId }).del();
        return replay.status(204).send()
    })
}