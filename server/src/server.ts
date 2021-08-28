import 'reflect-metadata';
import { Container } from 'typeorm-typedi-extensions';
import { createConnection, useContainer as useTypeORM } from 'typeorm';
import { getMetadataArgsStorage, useContainer as useRoutingControllers, useExpressServer } from 'routing-controllers';
import { routingControllersToSpec } from 'routing-controllers-openapi';
import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import morgan from 'morgan';
import { serve, setup } from 'swagger-ui-express';

import ApiController from 'controllers/ApiController';

/**
 * Start Express server.
 */

// To run on a different port, change this variable.
const port = 4000;

//
useTypeORM(Container);
useRoutingControllers(Container);

// This logs all API calls to this server into 'access.log'.
// To log to a different file, change the path.
const accessLogStream = fs.createWriteStream(path.join(__dirname, '../access.log'), {
  flags: 'a',
});

// ADD ALL CONTROLLERS BELOW.
// This adds the Swagger docs to each endpoint.
// This is available at `/docs` when the server is running.
const spec = routingControllersToSpec(
  getMetadataArgsStorage(),
  {
    controllers: [ApiController],
  },
  {
    components: {
      securitySchemes: {
        ApiKeyAuth: {
          type: 'apiKey',
          in: 'header',
          name: 'Authorization',
        },
      },
    },
    info: {
      title: 'Phobos Server API',
      description: 'Output types described in `api.ts`',
      version: '1.0.0',
    },
  },
);

// The server runs on sqlite.
// A different DBMS can be used by changing the configuration below.
createConnection({
  type: 'sqlite',
  database: process.env.DB,
  entities: [__dirname + '/entities/*.ts'],
}).then(async (connection) => {
  await connection.synchronize();

  const app = express();
  app.use(cors());
  app.use(express.static('public'));
  app.use('/docs', serve, setup(spec));
  app.use(morgan('combined', { stream: accessLogStream }));

  useExpressServer(app, {
    defaultErrorHandler: false,
    controllers: [__dirname + '/controllers/*.ts'],
    middlewares: [__dirname + '/middlewares/*.ts'],
  });

  app.listen(port, () => {
    console.log(`  App is running at http://localhost:${port} in ${port} mode`);
    console.log('  Press CTRL-C to stop\n');
  });
});
