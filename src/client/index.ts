import { Connection, DataSourceOptions, createConnection, getConnectionManager } from "typeorm";


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

    async createConnection(name: string, schema = 'public') {
      this.defaultConnection = this.connectionManager.get(); // Retrieve the default connection here
  
      let config: DataSourceOptions = {
        ...this.defaultConnection.options,
        schema: schema,
        name: name
      };
      
      const newConnection = await createConnection(config);
      this.connectionManager.connections.push(newConnection); // Push the newConnection object into connections array
      return newConnection;
    }
    
}