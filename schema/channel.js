export default `
    type Channel {
        name: String 
        lastActive: Int
        private: Boolean
        members: [User]!
        messages: [Message]!
        team: Team 
    }
    `
    
