const {DataTypes} = require('sequelize')
const sequelize = require('../config/dbConfig')

const nim = sequelize.define('profile', {
    NIM:{
        type: DataTypes.STRING(20),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    Nama:{
        type: DataTypes.STRING(50),
        allowNull: false
    },
    Alamat:{
        type: DataTypes.STRING(100),
        allowNull: false
    },
    Email: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    NoHP: {
        type: DataTypes.STRING(20),
        allowNull: false
    }
}, {
    tableName: 'profile'
})

module.exports = profile