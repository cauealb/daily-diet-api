
import 'dotenv/config'
import fastify from "fastify";
import { Routes } from './routes';
import cookie from '@fastify/cookie'

const app = fastify();

app.register(cookie)
app.register(Routes);

app.listen({
    port: 1212
}).then(() => {
    console.log("Servidor iniciado com sucesso! 🚀")
})