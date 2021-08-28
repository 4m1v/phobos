import express from 'express';
import jsonGraphqlExpress from 'json-graphql-server';

import data from './data.js';

const PORT = 4000;
const app = express();
app.use('/', jsonGraphqlExpress.default(data));
app.listen(PORT);
