import express from 'express';
import cors from 'cors';
import jsonGraphqlExpress from 'json-graphql-server';

import data from './data.js';

const PORT = 4000;
const app = express();
app.use(cors());
app.use('/', jsonGraphqlExpress.default(data));
app.listen(PORT);
