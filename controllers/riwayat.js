const { Pengajuan, User } = require('../models')
const { format } = require('date-fns');
const { id } = require('date-fns/locale');
const { where } = require('sequelize');
const formatTanggal = (date) => {
    return format(new Date(date), 'dd MMMM yyyy', { locale: id });
};
const getAllRiwayat = async (req, res) => {
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
    res.render('riwayat', { title: 'Riwayat', pengajuans, dosens });
}

const getAllRiwayatDosen = async (req, res) => {
    const id = req.cookies.userId || null
    console.log(req.cookies.userId)
    let pengajuans = await Pengajuan.findAll({
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

const AddDetails = async (req, res) => {
    try {
        const {detail} = req.body
        const {id} = req.params

        let pengajuan = await Pengajuan.findOne({
            where: {
                id: id
            }
        });
        if (!pengajuan) {
            return res.status(404).json({ error: 'pengajuan not found' });
        }

        await Pengajuan.update({
            detail: detail
        }, {
            where: {
                id: id
            }
        })
        return res.status(200).redirect('/riwayat/dosen');
    } catch (error) {
        console.error('Error adding perbaikan:', error);
        // res.redirect('/riwayat/dosen?error=Failed to update pengajuan');
    }
}



module.exports = {getAllRiwayat, getAllRiwayatDosen, AddDetails}
    
