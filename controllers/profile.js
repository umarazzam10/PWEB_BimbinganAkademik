const modelUser = require('../models/user')
const {Op, where, Model} = require('sequelize')

const tampilProfile = async(req,res) =>{
    try{
        const findAllKategori = await modelUser.findAll();       //ambil semua data
        console.log(findAllKategori.length)
        if (findAllKategori.length > 0) {       //di cek dulu berapa penjang data yang didapat, karena datanya berupa array, jadi length nya dapat diketahui, jika tidak ada data, maka length nya 0
            res.status(200).json({ success: true, message: 'Data kategori tersedia', data: findAllKategori });
        } else {
            res.status(400).json({ success: false, message: 'Data kategori tidak tersedia', data: findAllKategori });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error });
    }
}

module.exports = {
    tampilProfile
}