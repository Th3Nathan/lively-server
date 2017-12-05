import Sequelize from 'sequelize';

let sequelize;
if (process.env.DATABASE_URL) {
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialiect: 'postgres',
    define: {underscored: true}
  })
} else {
  sequelize = new Sequelize('lively', 'nathan', ' ', {
    dialect: 'postgres',
    define: {
      underscored: true,
    }
  });
}
const models = {
    User: sequelize.import('./user'),
    Channel: sequelize.import('./channel'),
    Group: sequelize.import('./group'),
    Image: sequelize.import('./image'),
    Message: sequelize.import('./message'),
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