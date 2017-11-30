export default `
    type User {
        id: Int! 
        username: String!
        email: String!
        password: String!

    }
    type Query {
        getUser(id: Int!): User!
        allUsers: [User!]!
    }
    type Mutation {
        createUser(username: String!, email: String!, password: String!): User!
    }
`

// snoozeUntil: Int
// channels: [Channel]!
// team: [Team]!
// groups: [Group]!
// messages: [Message]!
// ownedChannels: [Channel]!
// imageUrl: String
// isSnoozing: Boolean! 
// unreadGroups: [Group]!
// unreadChannel: [Channel]!