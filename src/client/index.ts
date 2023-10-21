import { Connection, createConnection, getConnectionManager } from "typeorm";
import { CockroachConnectionOptions } from "typeorm/driver/cockroachdb/CockroachConnectionOptions.js";
import { OracleConnectionOptions } from "typeorm/driver/oracle/OracleConnectionOptions.js";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions.js";
import { SapConnectionOptions } from "typeorm/driver/sap/SapConnectionOptions.js";
import { SpannerConnectionOptions } from "typeorm/driver/spanner/SpannerConnectionOptions.js";
import { SqlServerConnectionOptions } from "typeorm/driver/sqlserver/SqlServerConnectionOptions.js";

export  type supportedDataSourceOption =  PostgresConnectionOptions | CockroachConnectionOptions  | SqlServerConnectionOptions | SapConnectionOptions | OracleConnectionOptions   | SpannerConnectionOptions;

type CustomDataSourceOptions<T extends supportedDataSourceOption> = T & {
  schema: string;
  name: string;
} & (T extends { type: "cockroachdb" } ? { timeTravelQueries: boolean } : {});

export default class manager{
    connectionManager = getConnectionManager();  
    defaultConnection = this.connectionManager.get();

    /**
     * Gets registered connection with the given name.
     * If connection is not found then it will create the new connection
     */
    async getConnection(name: string): Promise<Connection>{

      if (this.connectionManager.has(name)) {
        const existingConnection = this.connectionManager.get(name);
        // if not connect then connect 
        if (!existingConnection.isConnected) {
          await existingConnection.connect();
        }
        return existingConnection;
      }

      // if connection don't exist then create a new connection
      return await this.createConnection(name)
    }

    async createConnection<T extends supportedDataSourceOption>(name: string, schema = 'public') {
      this.defaultConnection = this.connectionManager.get(); // Retrieve the default connection here
  
      let config: CustomDataSourceOptions<T> = {
        ...this.defaultConnection.options,
        schema: schema,
        name: name
      } as CustomDataSourceOptions<T>;
  
      const newConnection = await createConnection(config);
      this.connectionManager.connections.push(newConnection); // Push the newConnection object into connections array
      return newConnection;
    }
    
}