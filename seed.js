import Faker from 'faker';
import bcrypt from 'bcrypt'
const stringToTeamName = (str) => {
    return str.toLowerCase().replace(/ /g, '-');
}

// password is password


const user1 = {
    username: Faker.internet.userName(),
    email: Faker.internet.email(),
    password: Faker.internet.password(),
}

const user2 = {
    username: Faker.internet.userName(),
    email: Faker.internet.email(),
    password: Faker.internet.password(),
}

const user3 = {
    username: Faker.internet.userName(),
    email: Faker.internet.email(),
    password: Faker.internet.password(),
}

const user4 = {
    username: Faker.internet.userName(),
    email: Faker.internet.email(),
    password: Faker.internet.password(),
}

const team1 = {
    name: 'App Academy',
}

const team2 = {
    name: 'Google  google',
}


const channel1 = {
    name: Faker.random.word()
}

const channel2 = {
    name: Faker.random.word()
}

const channel3 = {
    name: Faker.random.word()
}

const channel4 = {
    name: Faker.random.word()
}

const nathan = {
    username: 'th3nathan',
    email: 'nathanevass@gmail.com',
    password: 'password'
}
export default async ({User, Message, Team, Group, Image, Channel}) => {
    try {
        let me = await User.create(nathan);
        let savedUser = await User.create(user1);
        let savedUser2 = await User.create(user2);
        await User.create(user3);
        await User.create(user4);
        let team = await Team.create({...team1, owner: savedUser.id});
        team.addUser(me.id);
        let otherteam = await Team.create({...team2, owner: savedUser.id});
        let c1 = await Channel.create({...channel1, creatorId: savedUser.id, teamId: team.id});
        let c2 = await Channel.create({...channel2, creatorId: savedUser.id, teamId: team.id});
        let c3 = await Channel.create({...channel3, creatorId: savedUser.id, teamId: team.id});
        let c4 = await Channel.create({...channel4, creatorId: savedUser.id, teamId: team.id});
        await savedUser2.addChannels([c2.id, c3.id, c4.id]);
        let thread = await Message.create({contents: Faker.lorem.sentence(), teamId: team.id, authorId: savedUser.id});
        let sub1 = await Message.create({contents: Faker.lorem.sentence(), teamId: team.id, authorId: savedUser.id});
        let sub2 = await Message.create({contents: Faker.lorem.sentence(), teamId: team.id, authorId: savedUser.id});
        let sub3 = await Message.create({contents: Faker.lorem.sentence(), teamId: team.id, authorId: savedUser.id});
        thread.addMessages([sub1.id, sub2.id, sub3.id]);
        let thread2 = await Message.create({contents: Faker.lorem.sentence(), teamId: team.id, authorId: savedUser.id});
        let thread3 = await Message.create({contents: Faker.lorem.sentence(), teamId: team.id, authorId: savedUser.id});
        c1.addMessages([thread.id, thread2.id, thread3.id]);
        console.log("---")
        console.log("---")
        console.log("---")
        console.log("---")
        console.log("---")
        console.log("---")
        console.log("---")
        console.log("---")
        console.log("---")
        console.log("---")
        console.log("---")
        console.log("---")
        console.log("---")
        let nathansteam = await me.getTeams({where: {url: 'google--google'}});
        console.log(nathansteam);

    } catch (err) {
        return err;
    }

}