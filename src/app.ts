import fastify from "fastify";
import { Routes } from './routes';
import cookie from '@fastify/cookie'

export const app = fastify();

app.register(cookie)
app.register(Routes);