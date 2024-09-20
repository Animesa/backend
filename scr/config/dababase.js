import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'scr/data/inventarios.sqlite'
});

export default sequelize;