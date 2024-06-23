
const multer = require('multer')
const { Notification } = require('../models')
const { Op } = require('sequelize')
const Sequelize = require('sequelize')
const { format } = require('date-fns');
const { id } = require('date-fns/locale');

const formatTanggal = (date) => {
    return format(new Date(date), 'dd MMMM yyyy HH:mm', { locale: id });
};


const getAllNotification = async (req, res, next) => {
    const id = req.cookies.userId || null
    const nama = req.cookies.userName || null
    let notifications = await Notification.findAll({
      where: {
        // Menggunakan Sequelize.fn('TRIM', Sequelize.col('nama_user')) untuk trim nama_user
        [Op.and]: [
            Sequelize.where(Sequelize.fn('TRIM', Sequelize.col('nama_user')), {
                [Op.eq]: nama?.trim()
            })
        ]
    },
      order: [['createdAt', 'DESC']]
    });
    notifications = notifications.map(t => ({
        ...t.toJSON(),
        createdAt: formatTanggal(t.createdAt),
    }));
 
    //return res.status(200).json({ success: false, message: 'Kesalahan Server', data: notifications })
    res.render('mahasiswa/notification', { title: 'Notifikasi', notifications});
}

const getAllNotificationJson = async (req, res, next) => {
    const id = req.cookies.userId || null
    const nama = req.cookies.userName || null
    let notifications = await Notification.findAll({
      where: {
        // Menggunakan Sequelize.fn('TRIM', Sequelize.col('nama_user')) untuk trim nama_user
        [Op.and]: [
            Sequelize.where(Sequelize.fn('TRIM', Sequelize.col('nama_user')), {
                [Op.eq]: nama?.trim()
            })
        ]
    },
      order: [['createdAt', 'DESC']]
    });
    notifications = notifications.map(t => ({
        ...t.toJSON(),
        createdAt: formatTanggal(t.createdAt),
    }));
 
    return res.status(200).json({ success: true, message: 'Berhasil', data: notifications })
    //res.render('mahasiswa/notification', { title: 'Notifikasi', notifications});
}


module.exports = { getAllNotification, getAllNotificationJson }