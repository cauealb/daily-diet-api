import { FastifyReply, FastifyRequest } from "fastify";

export async function VerifyCookieId(request: FastifyRequest, replay: FastifyReply) {
    const cookieid = request.headers.cookie;

    if(!cookieid) {
        replay.status(401).send({
            err: 'Unauthorized.'
        })
    }
}