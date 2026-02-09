
import 'dotenv/config'
import fastify from "fastify";

const app = fastify();

console.log(process.env.PORT)

app.get('/hello', () => {
    return 'Entrou!'
})

app.listen({
    port: 1212
}).then(() => {
    console.log("Servidor inciado! 🚀")
})