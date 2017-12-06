import bcrypt from 'bcrypt';

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
                        msg: 'Username length must be 3-20 characters.'
                    }
                }
            },
            email: {
                type: DataTypes.STRING, 
                notNull: true,
                unique: true,
                validate: {
                    isEmail: {
                        args: true,
                        msg: "Enter a valid email",
                    },
                },
            },
            password: {
                type: DataTypes.STRING, 
                notNull: true,
                validate: {
                    len: {
                        args: [5, 20],
                        msg: 'Password must be 5-20 characters.'
                    }
                }
            }, 
            snooze_until: { 
                type: DataTypes.DATE, 
            }, 
        },
        {
            hooks: {
                afterValidate: async (user, options) => {
                    try {
                        const password = await bcrypt.hash(user.password, 12);
                        user.password = password;
                    } catch (err) {
                        console.log(err);
                    }
                    return user;
                },
            }
        }
    );

    User.prototype.sayHi = () => "hello"
    User.associate = function(models) {
        User.hasOne(models.Image, {
            foreignKey: {name: 'imageableId', field: 'imageable_id'}
        });

        User.belongsToMany(models.Team, {
            through: 'user_team'
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
