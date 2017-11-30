export default `
    union Messageble = Message | Group | Channel
    type Message {
        id: Int!
        contents: String!
        type: String 
        team: Team 
        author: User 
        channel: Channel 
        group: Group 
        thread: Message 
        parent: Messageble 
    }
`