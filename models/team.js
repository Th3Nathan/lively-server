export default (sequelize, DataTypes) => {
    const Team = sequelize.define('team', 
        {
            name: {
                type: DataTypes.STRING, 
                notNull: true, 
                unique: true,
                validate: {
                    is: {
                        args: /^[a-z][a-z ]*[a-z]$/igm,
                        msg: "Invalid Team Name!!!"
                    },
                    isUnique: async function(val, next) {
                        if (val) {
                            let converted = val.toLowerCase().replace(/ /g, '-');
                            try {
                                let team = await Team.find({where: {url: converted}})
                                if (team){
                                    return next("Already Taken!");
                                } else {
                                    return next();
                                }
                            } catch(err){ return next(err)}
                        }
                    }
                }
            },
            url: {
                type: DataTypes.STRING,
                notNull: true,
                unique: true,
                validate: {
                }
            }
        },
        {
            hooks: {
                beforeValidate: (team, options) => {
                    team.url = team.name.toLowerCase().replace(/ /g, '-');
                }
            }
        }
    );

    Team.associate = function(models) {
        Team.hasMany(models.Image, {
            foreignKey: { name: 'imageableId', field: 'imageable_id'}
        });

        Team.belongsToMany(models.User, {
            through: 'userTeam'
        });

        Team.belongsTo(models.User, {
            foreignKey: 'owner'
        })

        Team.hasMany(models.Channel, {
            foreignKey: { name: 'teamId', field: 'team_id'},
        });
        
        Team.hasMany(models.Message, {
            foreignKey: { name: 'teamId', field: 'team_id'},
        });
    }
    return Team;
}

