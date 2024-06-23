const { User } = require("../models");
const bcrypt = require("bcrypt");

const ubahPassword = async (req, res, next) => {
    const { oldPassword, newPassword} = req.body;
    const userId = req.session.userId;
    console.log("User ID:", userId);
    try {
        
        const user = await User.findByPk(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        
        const validOldPassword = await bcrypt.compare(oldPassword, user.password);
        if (!validOldPassword) {
            return res.status(400).json({ message: 'Old password is incorrect' });
        }

        
        const hashedPassword = await bcrypt.hash(newPassword, 10);


        await user.update({ password: hashedPassword });

        
        res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
        console.error("Error during password change:", error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    ubahPassword
};
