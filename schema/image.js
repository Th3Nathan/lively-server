export default `
    union Imageable = User | Team | Message
    type Image {
        id: Int! 
        imageUrl: String
        parent: Imageable
    }
`