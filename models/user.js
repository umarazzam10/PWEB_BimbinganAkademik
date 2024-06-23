'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Pengajuan, {
        foreignKey: 'id_user',
        as: 'pengajuans'
    });  
    }
  }
  User.init({
    email: { 
      type: DataTypes.STRING,
      unique: true 
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
