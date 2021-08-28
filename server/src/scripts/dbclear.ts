import { createConnection } from 'typeorm';

/**
 * This script clears the database and synchronises it with database entities.
 */

// The server runs on sqlite.
// A different DBMS can be used by changing the configuration below.
createConnection({
  type: 'sqlite',
  database: process.env.DB,
  entities: [__dirname + '../../entities/*.ts'],
}).then(async (connection) => {
  await connection.synchronize();

  const entities = connection.entityMetadatas;
  for (const entity of entities) {
    const repository = connection.getRepository(entity.name);
    await repository.clear();
  }
});
