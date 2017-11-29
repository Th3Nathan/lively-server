

export default (sequelize, DataTypes) => {
    const Message = sequelize.define('message', 
        {
            contents: {
                type: DataTypes.STRING, 
                notNull: true
            }, 
            messageble: DataTypes.STRING,
            messagebleId: DataTypes.INTEGER
        }, 
        {underscored: true}
    );

    Message.prototype.getItem = function(options) {
        return this['get' + this.get('messageble').substr(0, 1).toUpperCase() + this.get('messageble').substr(1)](options);
    };

    Message.associate = function(models) {
        Message.belongsTo(models.Team, {
            foreignKey: {name: 'teamId', field: 'team_id'}
        });

        Message.belongsTo(models.User, {
            foreignKey: {name: 'authorId', field: 'author_id'}
        });

        Message.belongsTo(models.Channel, {
            foreignKey: {name: 'messagebleId', field: 'messageble_id'}, 
            constraints: false, 
            as: 'channel'
        });

        Message.belongsTo(models.Group, {
            foreignKey: {name: 'messagebleId', field: 'messageble_id'},
            constraints: false,
            as: 'group'
        });

        Message.belongsTo(models.Message, {
            foreignKey: {name: 'messagebleId', field: 'messageble_id'},
            constraints: false,
            as: 'thread'
        });

        Message.hasMany(models.Message, {
            foreignKey: {name: 'messagebleId', field: 'messageble_id'},
            constraints: false,
            scope: {
              commentable: 'thread'
            }
        });

        Message.belongsTo(models.Team, {
            foreignKey: {name: 'teamId', field: 'team_id'}
        });

        Message.hasMany(models.Reaction, {
            foreignKey: {name: 'messageId', field: 'message_id'}
        });
    }    


    return Message;
}
