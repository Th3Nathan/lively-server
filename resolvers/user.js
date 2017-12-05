import bcrypt from 'bcrypt';
import { formatErrors } from '../util';
export default {
    Query: {
        getUser: (parent, {id}, {models}) => models.User.findOne({ where: { id } }),
        allUsers: (parent, args, {models}) => models.User.findAll(),
    },
    Mutation: {
        createUser: (parent, args, {models}) => ({user: models.User.create(args.input)}),
        registerUser: async (parent, {input: {username, email, password}}, {models}) => {
            try {
                const passwordDigest = await bcrypt.hash(password, 12);
                await models.User.create({passwordDigest, username, email});
                return true;
            } catch (err) {
                console.log(err);
                return false;
            }
            
        },
        loginUser: async(parent, {input: {email, password, url}}, {models: {User}}) => {
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