export default {
    Mutation: {
        createMessage: async (parent, args, {models, user}) => {
            try {
                await models.Message.create({...args.input, authorId: user.id});
                return true;
            } catch(err) {
                console.log(err);
                return false;
            }
        }
    }
}