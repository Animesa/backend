import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'src/data/inventarios.sqlite'
});

export default sequelize;