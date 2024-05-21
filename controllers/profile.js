const modelProfile = require('../models/profile')
const {Op, where, Model} = require('sequelize')

const halProfile = async (req,res) => {
    res.render ('profile')
}

const tampilProfile = async(req,res) =>{
    try{
        const findAllProfile = await modelProfile.findAll();       //ambil semua data
        console.log(findAllProfile.length)
        if (findAllProfile.length > 0) {       //di cek dulu berapa penjang data yang didapat, karena datanya berupa array, jadi length nya dapat diketahui, jika tidak ada data, maka length nya 0
            res.status(200).json({ success: true, message: 'Data Profile tersedia', data: findAllProfile });
        } else {
            res.status(400).json({ success: false, message: 'Data Profile tidak tersedia', data: findAllProfile });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error });
    }
}
module.exports = {
    tampilProfile
}