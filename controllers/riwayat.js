const { Pengajuan, User } = require('../models')
const { format } = require('date-fns');
const { id } = require('date-fns/locale');
const formatTanggal = (date) => {
    return format(new Date(date), 'dd MMMM yyyy', { locale: id });
};
const getAllRiwayat = async (req, res, next) => {
    const id = req.cookies.userId || null
    console.log(req.cookies.userId)
    let pengajuans = await Pengajuan.findAll({
        where: { id_user: id },
        include: {
            model: User,
            as: 'user'
        }
    });
    pengajuans = pengajuans.map(t => ({
        ...t.toJSON(),
        jadwal: formatTanggal(t.jadwal),
    }));
    const mahasiswas = await User.findAll({
        where: {role: "mahasiswa"}
    });
    res.render('riwayat', { title: 'Riwayat', pengajuans, mahasiswas });
}

const getAllRiwayatDosen = async (req, res, next) => {
    const id = req.cookies.userId || null
    console.log(req.cookies.userId)
    let pengajuans = await Pengajuan.findAll({
        where: { id_user: id },
        include: {
            model: User,
            as: 'user'
        }
    });
    pengajuans = pengajuans.map(t => ({
        ...t.toJSON(),
        jadwal: formatTanggal(t.jadwal),
    }));
    const dosens = await User.findAll({
        where: {role: "dosen"}
    });
    res.render('riwayatDosen', { title: 'Riwayat Dosen', pengajuans, dosens });
}

module.exports = {getAllRiwayat, getAllRiwayatDosen}
    
