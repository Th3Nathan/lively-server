export default `
    type Group {
        id: Int!
        lastActive: Int! 
        team: Team
        members: [User]!
        messages: [Message]!
    }
`