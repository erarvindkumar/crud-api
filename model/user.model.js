const sequelize = require('../databaseConfig/db.js');
const DataTypes = require('sequelize');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  first_name: {
    type: DataTypes.STRING(25)
  },
  last_name: {
    type: DataTypes.STRING(25)
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  password: {
    type: DataTypes.STRING
  }
});

module.exports = { User };
