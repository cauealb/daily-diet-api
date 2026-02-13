import { config } from "dotenv";
import { number, z } from 'zod'

const envSchema = z.object({
    PORT: z.coerce.number().default(1212),
    DATABASE_URL: z.string()
})

const _env = envSchema.safeParse(process.env);

if (_env.success === false) {
    console.error("Erro nas váriaveis de ambiente: ", _env.error.format());

    throw Error("Erro nas váriaveis de ambiente!");
}

export const env = _env.data