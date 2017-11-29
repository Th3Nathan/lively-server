import Sequelize from 'sequelize';

export default (sequelize, DataTypes) => {
    const Channel = sequelize.define('channel', 
        {
            name: {
                type: DataTypes.STRING,
                notNull: true 
            },
            latestActivity: {
                type: DataTypes.DATE
            },
            private: {
                type: DataTypes.BOOLEAN, 
                notNull: true, 
                defaultValue: false 
            }
        }, 
        { underscored: true }
    );

    Channel.associate = function(models) {
        Channel.belongsTo(models.Team, {
            foreignKey: {name: 'teamId', field: 'team_id'}
        });

        Channel.belongsToMany(models.User, {
            through: 'userChannel'
        });

        Channel.hasMany(models.Message, {
            foreignKey: {name: 'messagebleId', field: 'messageble_id'},
            constraints: false,
            scope: {
              commentable: 'channel'
            }
        });

    }
    return Channel;
}

