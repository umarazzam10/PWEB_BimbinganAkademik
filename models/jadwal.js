"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Jadwal extends Model {
        static associate(models) {
        }
    }
    Jadwal.init(
        {
            tanggal: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            waktu: {
                type: DataTypes.TIME,
                allowNull: false,
            }
        },
        {
            sequelize,
            modelName: "Jadwal",
        }
    );
    return Jadwal;
};