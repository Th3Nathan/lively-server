export default `
    type Team {
        name: String 
        imageUrl: String 
        members: [User]!
        messages: [Message]!
        messageCount: Int! 
        channels: [Channel]!
        channelCount: Int!
    }
`