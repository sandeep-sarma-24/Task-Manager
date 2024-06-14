const User = require('../models/user');

exports.getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).select('-password');
        res.status(200).json({ user , status: true, msg: "Profile fetched successfully.." });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
};