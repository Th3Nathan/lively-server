import bcrypt from 'bcrypt';
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
            
        }
    },
};