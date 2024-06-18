'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    email: { 
      type: DataTypes.STRING,
      unique: true // Making email attribute unique
    },
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING,
    nama: DataTypes.STRING,
    nim_nip: DataTypes.STRING,
    alamat: DataTypes.STRING,
    noHp: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
