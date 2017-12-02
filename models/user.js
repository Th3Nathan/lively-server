
export default (sequelize, DataTypes) => {
    const User = sequelize.define('user', 
        {
            username: {
                type: DataTypes.STRING, 
                notNull: true, 
                unique: true,
            },
            email: {
                type: DataTypes.STRING, 
                unique: true, 
                notNull: true,
              
            },
            passwordDigest: {
                type: DataTypes.STRING, 
                field: 'password_digest',
                notNull: true 
            }, 
            snooze_until: { 
                type: DataTypes.DATE, 
            }, 
        }
    );

    User.prototype.sayHi = () => "hello"
    User.associate = function(models) {
        User.hasOne(models.Image, {
            foreignKey: {name: 'imageableId', field: 'imageable_id'}
        });

        User.belongsToMany(models.Team, {
            through: 'userTeam'
        });

        User.belongsToMany(models.Group, {
            through: 'userGroup'
        });

        User.belongsToMany(models.Channel, {
            through: 'userchannel'
        });

        User.hasMany(models.Message, {
            foreignKey: {name: 'authorId', field: 'author_id'}
        });

        User.hasMany(models.Channel, {
            foreignKey: {name: 'creatorId', field: 'creator_id'},
            as: 'creator'
        });
    }
    return User;
}
