const {DataTypes} = require('sequelize')
const sequelize = require('../config/dbConfig')

var profile = sequelize.define('profile', {
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
    },
    created_at : {
        type        : DataTypes.DATEONLY,
        allowNull   : false
    },
    updated_at : {
        type        : DataTypes.DATEONLY,
        allowNull   : false
    }
}, {
    freezeTableName : true,
    timestamps  : true,
    createdAt:'created_at',
    updatedAt: 'updated_at'
})

module.exports = profile