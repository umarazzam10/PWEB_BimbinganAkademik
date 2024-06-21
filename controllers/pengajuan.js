
const multer = require('multer')
const { Pengajuan, User } = require('../models')
const path = require('path')
const { format } = require('date-fns');
const { id } = require('date-fns/locale');
const { Op } = require('sequelize')
const formatTanggal = (date) => {
    return format(new Date(date), 'dd MMMM yyyy', { locale: id });
};

const formatTanggal1 = (date) => {
    return format(new Date(date), 'yyyy-MM-dd', { locale: id });
};


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../', 'public', 'file'))
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})


const upload = multer({
    storage: storage,
});
const uploadd = upload.single('file')

const postPengajuan = async (req, res) => {
    const userId = req.cookies.userId;
    try {
        const { nama_dosen, jadwal, waktu, topic, status } = req.body
        const file_uploaded = req.file
        const postData = {
            topic: topic,
            nama_dosen: nama_dosen,
            id_user: userId,
            status: 0,
            jadwal: jadwal,
            waktu: waktu
        };

        // Jika file diunggah, tambahkan properti file ke dalam objek pembaruan
        if (file_uploaded) {
            postData.file = file_uploaded.originalname;
        }
        await Pengajuan.create(postData)

        return res.redirect('/pengajuan');
    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: 'Kesalahan Server' })
    }
}

const getAllPengajuan = async (req, res, next) => {
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
    //return res.status(200).json({ success: false, message: 'Kesalahan Server', data: pengajuans })
    res.render('mahasiswa/pengajuanMhs', { title: 'Pengajuan Bimbingan', pengajuans, dosens });
}

const getAllPengajuanDosen = async (req, res, next) => {
    const id = req.cookies.userId || null
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
    //return res.status(200).json({ success: false, message: 'Kesalahan Server', data: pengajuans })
    res.render('dosen/pengajuan', { title: 'Pengajuan Bimbingan', pengajuans, dosens });
}

const getEditPengajuan = async (req, res, next) => {
    try {
        let pengajuan = await Pengajuan.findByPk(req.params.id);
        if (!pengajuan) {
            return res.status(404).json({ error: 'pengajuan not found' });
        }
        pengajuan.jadwal = formatTanggal1(pengajuan.jadwal)
        res.json(pengajuan); // Mengirim data pengajuan dalam format JSON
    } catch (error) {
        console.error('Error fetching pengajuan data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const putPengajuan = async (req, res) => {
    const userId = req.cookies.userId;
    try {
        const { nama_dosen, jadwal, waktu, topic, id } = req.body;
        const file_uploaded = req.file;

        // Buat objek pembaruan
        const updateData = {
            topic: topic,
            nama_dosen: nama_dosen,
            id_user: userId,
            jadwal: jadwal,
            waktu: waktu
        };

        // Jika file diunggah, tambahkan properti file ke dalam objek pembaruan
        if (file_uploaded) {
            updateData.file = file_uploaded.originalname;
        }

        await Pengajuan.update(updateData, {
            where: {
                id: id
            }
        });

        return res.redirect('/pengajuan');
    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: 'Kesalahan Server' })
    }
}

const putStatusPengajuan = async (req, res) => {
    try {
        const { status, id } = req.body;


        await Pengajuan.update({
            status: status
        }, {
            where: {
                id: id
            }
        })

        res.redirect('/pengajuan/dosen'); // Pengalihan ke halaman dosen setelah berhasil
    } catch (error) {
        console.error('Error adding perbaikan:', error);
        res.redirect('/dosen/pengajuan?error=Failed to update pengajuan');
    }
};

module.exports = { uploadd, postPengajuan, getAllPengajuan, getEditPengajuan, putPengajuan, getAllPengajuanDosen, putStatusPengajuan }