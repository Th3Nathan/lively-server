import bcrypt from 'bcrypt';
import { formatErrors } from '../util';
export default {
    Query: {
        getUser: (parent, {id}, {models}) => models.User.findOne({ where: { id } }),
        allUsers: (parent, args, {models}) => models.User.findAll(),
    },
    Mutation: {
        createUser: async (parent, {input: {username, email, password}}, {models}) => {
            if (password.length < 5) {
                return {
                    ok: false,
                    error: {message: 'Password must be at least 5 charachters', path: 'createUser'}
                }
            }
            try {
                const passwordDigest = await bcrypt.hash(password, 12);
                let user = await models.User.create({username, email, passwordDigest});
                return {ok: true, user};
            } catch (err) {
                return {
                    error: formatErrors(err, models)[0],
                    ok: false,
                }         
            }
        },
        loginUser: async (parent, {input: {username, email, password}}, {models}) => {
            try {
                let user = await models.User.findOne({where: { email, username }});
                if (!user) return {ok: false, error: {message: "No users with that username and email", path: "loginUser"}};
                if (bcrypt.compareSync(password, user.passwordDigest)) {
                    return {
                        ok: true,
                        user
                    }   
                } return {ok: false, error: {message: "The password was incorrect", path: "loginUser"}}
           } catch(err) {
               return {
                   error: {message: "There was a problem authenticating", path: "loginUser"},
                   ok: false,
               }
           }
        },
        teamLogin: async(parent, {input: {email, password, url}}, {models: {User}}) => {
            try {
                let user = await User.findOne({where: { email }});
                if (!user) return {ok: false};
                if (bcrypt.compareSync(password, user.passwordDigest)) {
                    let matchingTeams = await user.getTeams({where: { url }});
                    console.log(matchingTeams);
                    if (matchingTeams.length !== 0) {
                        return {
                            ok: true,
                            user
                        }   
                    }
                } return {ok: false}
           } catch(err) {
               return {
                   errors: formatErrors(err, models),
                   ok: false,
               }
           }
        }
    },
};