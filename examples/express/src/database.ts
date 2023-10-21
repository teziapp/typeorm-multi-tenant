import { DataSource } from "typeorm";
import dotenv from 'dotenv';

dotenv.config();

export const config:any={
    type: "postgres",
    host: process.env.host,
    port: process.env.database_port,
    username: process.env.user,
    password: process.env.password,
    database: process.env.database,
    ssl: process.env.ssl === "false" ? false : true,
    entities: [__dirname + "./typeorm/entity/*{.js,.ts}"],
    migrations: [__dirname + "./typeorm/migration/*{.js,.ts}"],
    synchronize: false,
    cli:{
        "migrationsDir": "dir/typeorm/migration",
        "entitiesDir": "dir/typeorm/entity"
    },
    pool: {
        max: 900,
        min: 0,
        idle: 10000
    },
}
const db = new DataSource(config);


export default db;