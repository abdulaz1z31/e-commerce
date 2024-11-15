import dotenv from "dotenv"
dotenv.config()


export const application = {
    port:process.env.PORT,
    node_env: process.env.NODE_ENV
}

export const db = {
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    host: process.env.PG_HOST,
    port: process.env.PG_PORT
}