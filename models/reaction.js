export default (sequelize, DataTypes) => {
    const Reaction = sequelize.define('reaction', 
        {
            type: {
                type: DataTypes.STRING,     
                notNull: true
            }
        }, 
        { underscored: true }
    );

    Reaction.associate = function(models) {
        Reaction.belongsTo(models.Image, {
            name: 'imageId', field: 'image_id'
        });

        Reaction.belongsTo(models.Message, {
            foreignKey: {name: 'messageId', field: 'message_id'}
        });
    }
    return Reaction;
}

