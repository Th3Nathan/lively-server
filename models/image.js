export default (sequelize, DataTypes) => {
    
    const Image = sequelize.define('image', 
        {
            file: {
                type: DataTypes.BLOB,
                notNull: true 
            },
            type: {
                type: DataTypes.STRING, 
                notNull: true
            },
            imageable: DataTypes.STRING,
            imageableId: DataTypes.INTEGER
        }
    );

    Image.prototype.getItem = function(options) {
        return this['get' + this.get('imageable').substr(0, 1).toUpperCase() + this.get('imageable').substr(1)](options);
    };


    Image.associate = function(models) {

        Image.belongsTo(models.Team, {
            foreignKey: {name: 'imageableId', field: 'imageable_id'},
            constraints: false,
            as: 'team'
        });

        Image.belongsTo(models.User, {
            foreignKey: {name: 'imageableId', field: 'imageable_id'},
            constraints: false,
            as: 'user'
        });

        Image.belongsTo(models.Message, {
            foreignKey: {name: 'imageableId', field: 'imageable_id'},
            constraints: false,
            as: 'message'
        });
    }
    return Image;
}
