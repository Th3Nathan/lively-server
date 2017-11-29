import Sequelize from 'sequelize';

const sequelize = new Sequelize('lively', 'nathan', ' ', {
  dialect: 'postgres',
  underscored: true,
} );
const models = {
    User: sequelize.import('./user'),
    Channel: sequelize.import('./channel'),
    Group: sequelize.import('./group'),
    Image: sequelize.import('./image'),
    Message: sequelize.import('./message'),
    Reaction: sequelize.import('./reaction'),
    Team: sequelize.import('./team'),
};

Object.keys(models).forEach(modelName => {
  if ('associate' in models[modelName]) {
    models[modelName].associate(models);
  }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;


export default models;