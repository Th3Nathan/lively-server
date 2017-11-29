export default (sequelize, DataTypes) => {
    const Image = sequelize.define('image', 
        {
            file: {
                type: DataTypes.BLOB,
                notNull: true 
            },
            type: {
                type: DataTypes.STRING, 
                notNull: true
            }
        },  
        { underscored: true }
    );

    Image.associate = function(models) {
        Image.hasMany(models.Team, {
            foreignKey: {name: 'imageId', field: 'image_id'}
        });

        Image.hasMany(models.Reaction, {
            name: 'messageId', field: 'message_id',
        });
        
        Image.hasMany(models.User, {
            foreignKey: {name: 'imageId', field: 'image_id'},
        });
    }
    return Image;
}
