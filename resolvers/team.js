
import {teamNameToUrl} from '../util';
export default {
    Mutation: {
        createTeam: async (parent, args, {models, user}) => {
            try {
                await models.Team.create({...args.input, owner: user.id});
                return true;
            } catch (err) {
                console.log(err);
                return false;
            }
        },
        doesTeamExist: async (parent, {input: {url}}, {models: {Team}}) => {
            let result = await Team.findOne({ where: { url } });
            return !!result;
        },        
    }
}