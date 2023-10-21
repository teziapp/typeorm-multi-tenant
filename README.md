
<h1 align="center">typeorm-multi-tenant ✨</h1>

<p align="center">
  <a href="https://www.npmjs.com/package/typeorm-multi-tenant">
    <img alt="Version" src="https://img.shields.io/npm/v/typeorm-multi-tenant.svg">
  </a>
  <a href="https://github.com/Errorname/typeorm-multi-tenant/blob/master/LICENSE">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" target="_blank" />
  </a>
</p>

typeorm-multi-tenant lib allows you to manage dynamic connection with multi tenant using typeorm, connection pooling is internally handled, you can create connection to specific tenant whenever you want!

## Installation
```sh
npm install typeorm-multi-tenant
```

## Usage
```js
import { Connection } from "typeorm";
import multiTenetConnectionManager from "typeorm-multi-tenant";

const manager = new multiTenetConnectionManager();

async function main() {
  const connection: Connection = await manager.createConnection("connection_name","schema_name");

  
  // Use the connection here
}

main();
```


## Documentation
checkout [Examples](/examples)

## 🤝 Contributors

Contributions, issues, and feature requests are welcome! 🙌

Feel free to check [issues page](https://github.com/Errorname/typeorm-multi-tenant/issues).

## Show your support

Give a ⭐️ if this project helped you!