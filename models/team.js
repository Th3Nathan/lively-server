export default (sequelize, DataTypes) => {
    const Team = sequelize.define('team', 
        {
            name: {
                type: DataTypes.STRING, 
                notNull: true, 
                unique: true 
            },
        }, 
        { underscored: true }
    );

    Team.associate = function(models) {
        Team.belongsTo(models.Image, {
            foreignKey: { name: 'imageId', field: 'image_id'}
        });

        Team.belongsToMany(models.User, {
            through: 'userTeam'
        });

        Team.hasMany(models.Message, {
            foreignKey: { name: 'teamId', field: 'team_id'}
        });

        Team.hasMany(models.Channel, {
            foreignKey: { name: 'teamId', field: 'team_id'},
        });
        
        Team.hasMany(models.Message, {
            foreignKey: { name: 'messageId', field: 'message_id'},
        });
    }
    return Team;
}

