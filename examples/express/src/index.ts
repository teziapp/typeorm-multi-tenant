import "reflect-metadata";
import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import { multiTenetConnectionManager as Manager } from "typeorm-multi-tenant";
import db from "./database";
dotenv.config();

const app = express();
const port = process.env.PORT || 4000;



app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.get('/query-schema', async (req: Request, res: Response) => {
  const manager = new Manager();
  
  const schema = req.query.schema as string;
  
  if (!schema) {
    res.status(400).send('Please provide a schema name');
    return;
  }

  try {
    
    const connection = await manager.createConnection(schema);
    const results = await connection.query('SELECT * FROM my_table');
    res.send(results);
    
  } catch (error) {
    console.error(`Error querying schema ${schema}: ${error}`);
    res.status(500).send('An error occurred while querying the database');
  }
});

app.listen(port, () => {
  db.initialize().then(async() => {
    // get the db info is it connected with prod or dev
    console.log("type orm Database connected");
    // log all the avaible schema and the table.
  }
  ).catch((err) => {
      console.error(err);
  });
  console.log(`[server]: Server is running at http://localhost:${port}`);
});