const jwt = require ("jsonwebtoken")
const bcrypt = require ("bcrypt")
var mysql = require ('mysql')

mysql.createConnection

const ubah_pass = async (req, res) => {
    const {old_password, new_password} = req.body
    const user = await User.findByPk (req.userId)
    if(!user){
        return res.status(404).json({message:"Pengguna tidak ditemukan"})
    } 
    const checkPass = await bcrypt.compare(old_password, user.password)
    if(!checkPass){
        return res.status(401).json({message:"Password saat ini salah"})
    } 
    const new_password_enkripsi = await bcrypt.hash(new_password, 10)
    await user.update({password: new_password_enkripsi})
    res.redirect('/profile')
}

module.exports = {
    ubah_pass
}