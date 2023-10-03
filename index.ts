import express from 'express';
const app = express();
import { graphqlHTTP } from 'express-graphql';
import { schema } from './schema/schema';
import { config } from 'dotenv';
import cors from 'cors';
config();

app.use(cors());

app.use(
    '/graphql',
    graphqlHTTP({
        schema: schema,
        graphiql: true
    })
)

app.listen(3452, () => console.log('App listening on 3452'));