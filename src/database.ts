import 'dotenv/config'
import knex, { type Knex } from "knex";

export const config: Knex.Config = {
    client: 'sqlite3',
    connection: {
        filename: process.env.DATABASE_URL!
    },
    useNullAsDefault: true,
    migrations: {
        extension: 'ts',
        directory: './db/migrations'
    }
}

export const db = knex(config)