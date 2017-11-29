export default (sequelize, DataTypes) => {
    const Group = sequelize.define('group', 
        {
            latestActivity: {
                type: DataTypes.DATE 
            }
        },
        { underscored: true }
    );

    Group.associate = function(models) {
        Group.belongsTo(models.Team, {
            foreignKey: {name: 'teamId', field: 'team_id'}
        });

        Group.belongsToMany(models.User, {
            through: 'userGroup'
        });

        Group.hasMany(models.Message, {
            foreignKey: {name: 'messagebleId', field: 'messageble_id'},
            constraints: false,
            scope: {
              commentable: 'group'
            }
        });
    }
    return Group;
}
