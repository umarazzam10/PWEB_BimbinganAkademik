"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Pengajuan extends Model {
        static associate(models) {
            Pengajuan.belongsTo(models.User, {
                foreignKey: 'id_user',
                as: 'user'
            });
        }
    }
    Pengajuan.init(
        {
            id_user: {
                type: DataTypes.INTEGER,
                allowNull: true,
                references: {
                    model: 'Users',
                    key: 'id'
                }
            },
            topic: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            nama_dosen: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            jadwal: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            waktu: {
                type: DataTypes.TIME,
                allowNull: false,
            },
            status: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            file: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
        },
        {
            sequelize,
            modelName: "Pengajuan",
        }
    );
    return Pengajuan;
};
