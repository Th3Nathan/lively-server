
export default (sequelize, DataTypes) => {
    const User = sequelize.define('user', 
        {
            username: {
                type: DataTypes.STRING, 
                notNull: true, 
                unique: true,
                validate: {
                    len: {
                        args: [3, 20],
                        msg: 'The username needs to be between 3 and 25 charachters long',
                    }
                }
            },
            email: {
                type: DataTypes.STRING, 
                unique: true, 
                notNull: true,
                validates: {
                    isEmail: {
                        args: true,
                        msg: "Invalid email",
                    },
                },
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
