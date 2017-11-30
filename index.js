import express from 'express';
import bodyParser from 'body-parser';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';
import models from './models';
import path from 'path';
import { fileLoader, mergeTypes, mergeResolvers } from 'merge-graphql-schemas';

const typeDefs = mergeTypes(fileLoader(path.join(__dirname, './schema')));
const resolvers = mergeResolvers(fileLoader(path.join(__dirname, './resolvers')));

export const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
});

const myGraphQLSchema = schema;
const PORT = 8080;

const app = express();

// bodyParser is needed just for POST.
app.use(
    '/graphql', 
    bodyParser.json(), 
    graphqlExpress({
        schema, 
        context: {
            models
        } 
    })
);
app.get('/graphiql', graphiqlExpress({ endpointURL: '/graphql' })); // if you want GraphiQL enabled

models.sequelize.sync({force: true}).then(x => {
    app.listen(PORT);
    console.log("listening")
})