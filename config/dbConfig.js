const {Sequelize} = require('sequelize')
require('dotenv').config()

const db = new Sequelize("bimbingan_akd", "root", '', {
    host: "localhost",
    dialect: 'mysql',
    timezone: '+07:00'
})

try {
    db.authenticate();
    console.log('Koneksi database berhasil.');
} catch (error) {
    console.error('Koneksi database tidak berhasil : ', error);
}

module.exports = db;