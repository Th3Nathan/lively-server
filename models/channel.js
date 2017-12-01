import Sequelize from 'sequelize';

export default (sequelize, DataTypes) => {
    const Channel = sequelize.define('channel', 
        {
            name: {
                type: DataTypes.STRING,
                notNull: true 
            },
            latestActivity: {
                type: DataTypes.DATE,
                defaultValue: Date.now()
            },
            private: {
                type: DataTypes.BOOLEAN, 
                notNull: true, 
                defaultValue: false 
            }
        }
    );

    Channel.associate = function(models) {
        Channel.belongsTo(models.Team, {
            foreignKey: {name: 'teamId', field: 'team_id'}
        });

        Channel.belongsToMany(models.User, {
            through: 'userchannel'
        });

        Channel.belongsTo(models.User, {
            foreignKey: {name: 'creatorId', field: 'creator_id'},
            as: 'creator'
        }) 

        Channel.hasMany(models.Message, {
            foreignKey: {name: 'messageableId', field: 'messageable_id'},
            constraints: false,
            scope: {
              messageable: 'channel'
            }
        });

    }
    return Channel;
}

