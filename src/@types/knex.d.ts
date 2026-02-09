import { Knex } from "knex";

declare module 'knex/types/tables.js' {
    interface Table {
        Users: {
            Id: string
            Name: string
            Height: number
            Weight: number
        },
        Meals: {
            IdMeals: string,
            Name: string,
            Description: string,
            Date: string,
            ItsOnTheDiet: boolean,
            IdUser: string
        }
    }
}