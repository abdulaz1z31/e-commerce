import pg from "pg";
import { db } from "../config/index.config.js";


const { Pool } = pg;


export const pool = new Pool({
  user: db.user,
  password: db.password,
  host: db.host,
  port: db.port,
  database: db.database,
});

