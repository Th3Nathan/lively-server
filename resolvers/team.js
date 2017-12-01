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
    Mutation: {
        createTeam: async (parent, args, {models, user}) => {
            try {
                await models.Team.create({...args.input, owner: 5});
                return true;
            } catch (err) {
                console.log(err);
                return false;
            }
        }
    }
}