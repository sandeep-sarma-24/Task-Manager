const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { ACCESS_TOKEN_SECRET } = process.env;

exports.verifyAccessToken = async (req, res, next) => {

    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ message: 'Access denied' });
    try {
        const user = jwt.verify(token, ACCESS_TOKEN_SECRET);
        user = await User.findById(user.id);
        if (!user) return res.status(401).json({ message: 'User is not found' });
        req.user = user;
        next();
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
};