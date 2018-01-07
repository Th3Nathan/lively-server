import bcrypt from 'bcrypt';
import { formatErrors } from '../util';
import { tryLogin } from '../auth';
export default {
    Query: {
        getUser: (parent, {id}, {models}) => models.User.findOne({ where: { id } }),
        allUsers: (parent, args, {models}) => models.User.findAll(),
    },
    Mutation: {
        createUser: async (parent, { input }, {models, SECRET}) => {
            try {
                let user = await models.User.create(input);
                return tryLogin(input.email, input.password, models, SECRET);
            } catch (err) {
                return {
                    errors: formatErrors(err, models),
                    ok: false,
                }         
            }
        },
        loginUser: async (parent, {input: {username, email, password}}, {models, SECRET}) => tryLogin(email, password, models, SECRET),
        teamLogin: async(parent, {input: {email, password, url}}, {models, SECRET}) => {
            try {
                let userResponse =  await tryLogin(email, password, models, SECRET);
                let matchingTeams = await userResponse.user.getTeams({where: { url }});
                if (matchingTeams.length !== 0) {
                    return userResponse; 
                } else {
                    return {ok: false, errors: [{path: 'team', message: "You are registered with this team!"}]}
                }
           } catch(err) {
               return {
                   errors: formatErrors(err, models),
                   ok: false,
               }
           }
        }
    },
};