
export default (sequelize, DataTypes) => {
    const User = sequelize.define('user', 
        {
            username: {
                type: DataTypes.STRING, 
                notNull: true, 
                unique: true 
            },
            email: {
                type: DataTypes.STRING, 
                unique: true, 
                isEmail: true
            },
            password: {
                type: DataTypes.STRING, 
                notNull: true 
            }, 
            snooze_until: { 
                type: DataTypes.DATE, 
                notNull: true, 
                defaultValue: null
            }, 
        }, 
        {underscored: true}
    );

    User.associate = function(models) {
        User.belongsTo(models.Image, {
            foreignKey: {name: 'imageId', field: 'image_id'}
        });

        User.belongsToMany(models.Team, {
            through: 'userTeam'
        });

        User.belongsToMany(models.Group, {
            through: 'userGroup'
        });

        User.belongsToMany(models.Channel, {
            through: 'userChannel'
        });

        User.hasMany(models.Message, {
            foreignKey: {name: 'authorId', field: 'author_id'}
        });

        User.hasMany(models.Channel, {
            foreignKey: {name: 'authorId', field: 'author_id'},
            as: 'creator'
        });
    }
    return User;
}
