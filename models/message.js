

export default (sequelize, DataTypes) => {
    const Message = sequelize.define('message', 
        {
            contents: {
                type: DataTypes.TEXT, 
                notNull: true
            }, 
            messageable: DataTypes.STRING,
            messageableId: {type: DataTypes.INTEGER, field: 'messageable_id'}
        }
    );

    Message.prototype.getItem = function(options) {
        return this['get' + this.get('messageable').substr(0, 1).toUpperCase() + this.get('messageable').substr(1)](options);
    };

    Message.associate = function(models) {
        Message.belongsTo(models.Team, {
            foreignKey: {name: 'teamId', field: 'team_id'}
        });

        Message.belongsTo(models.User, {
            foreignKey: {name: 'authorId', field: 'author_id'}
        });

        Message.belongsTo(models.Channel, {
            foreignKey: {name: 'messageableId', field: 'messageable_id'}, 
            constraints: false, 
            as: 'channel'
        });

        Message.belongsTo(models.Group, {
            foreignKey: {name: 'messageableId', field: 'messageable_id'},
            constraints: false,
            as: 'group'
        });

        Message.belongsTo(models.Message, {
            foreignKey: {name: 'messageableId', field: 'messageable_id'},
            constraints: false,
            as: 'thread'
        });

        Message.hasMany(models.Message, {
            foreignKey: {name: 'messageableId', field: 'messageable_id'},
            constraints: false,
            scope: {
              messageable: 'thread'
            }
        });

        Message.belongsTo(models.Team, {
            foreignKey: {name: 'teamId', field: 'team_id'}
        });

        Message.hasMany(models.Image, {
            foreignKey: {name: 'imageableId', field: 'imageable_id'}
        });
    }    


    return Message;
}
