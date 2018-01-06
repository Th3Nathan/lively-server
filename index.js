import express from 'express';
import bodyParser from 'body-parser';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';
import models from './models';
import path from 'path';
import { fileLoader, mergeTypes, mergeResolvers } from 'merge-graphql-schemas';
import seed from './seed';
import cors from 'cors';
import { addUser } from './auth';
const typeDefs = mergeTypes(fileLoader(path.join(__dirname, './schema')));
const resolvers = mergeResolvers(fileLoader(path.join(__dirname, './resolvers')));

export const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
    printErrors: true,
});

const myGraphQLSchema = schema;
const PORT = process.env.PORT || 8080;
export const SECRET = 'qwertyuiopljhgfdsaasdfghjkl';

  

const app = express();
app.use(cors('*'));
app.use(addUser);
// bodyParser is needed just for POST.
// user in context will eventually be req.user, but thats not working yet
app.use(
    '/graphql', 
    bodyParser.json(), 
    graphqlExpress(req =>({
        schema, 
        context: {
            models,
            SECRET,
            user: {
                id: 1,
            },
        } 
    }))
);

app.get('/graphiql', graphiqlExpress({ endpointURL: '/graphql' })); // if you want GraphiQL enabled

models.sequelize.sync({force: true}).then(x => {
    seed(models);
    app.listen(PORT);
    console.log("listening")
});