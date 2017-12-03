// export default {
//     // Query: {
//     //     getUser: (_, {id}, {models}) => models.User.findOne({ where: { id } }),
//     //     allUsers: (_, _, {models}) => models.User.findAll(),
//     // },
//     // Mutation: {
//     //     createUser: (parent, args, {models}) => models.create(args),
//     // },
// }

export default {
    Query: {
        doesTeamExist: async (parent, {input: name}, {models: Team}) => {
            let result = await Team.findOne({ where: { name } });
            return !!result;
        },        
    },
    Mutation: {
        createTeam: async (parent, args, {models, user}) => {
            try {
                await models.Team.create({...args.input, owner: user.id});
                return true;
            } catch (err) {
                console.log(err);
                return false;
            }
        }
    }
}