"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Notification extends Model {
        static associate(models) {
        }
    }
    Notification.init(
        {
            topic: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            description: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            nama_user: {
                type: DataTypes.STRING,
                allowNull: false,
            }
        },
        {
            sequelize,
            modelName: "Notification",
        }
    );
    return Notification;
};
