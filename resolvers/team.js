
import {teamNameToUrl, formatErrors} from '../util';
import _ from 'lodash';

export default {
    Query: {
        teamFromUrl: async (parent, {input: {url}}, {models}) => {
            try {
                let team = await models.Team.findOne({ where: { url }});
                return { name: team.name, url: team.url, ok: true };
            } catch(err) {
                return {ok: false, errors: formatErrors(err, models)}
            }
        }
    },
    Mutation: {
        createTeam: async (parent, args, {models, user}) => {
            try {
                let team = await models.Team.create({...args.input, owner: user.id});
                return {
                    team: {name: team.name, url: team.url},
                    ok: true 
                }
            } catch (err) {
                console.log(err);
                return {
                    ok: false,
                    errors: formatErrors(err, models),
                };
            }
        },
        doesTeamExist: async (parent, {input: {url}}, {models: {Team}}) => {
            let result = await Team.findOne({ where: { url } });
            return !!result;
        },        
    }
}