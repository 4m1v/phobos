import { createConnection } from 'typeorm';

// The server runs on sqlite.
// A different DBMS can be used by changing the configuration below.
createConnection({
  type: 'sqlite',
  database: process.env.DB,
  entities: [__dirname + '../../entities/*.ts'],
}).then(async (connection) => {
  await connection.synchronize();
});
