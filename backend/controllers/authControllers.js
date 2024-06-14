const User = require('../models/user');
const bcrypt = require('bcrypt');
const { createAccessToken } = require('../utils/token');
const { validateEmail } = require('../utils/validation');

exports.signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        if (!validateEmail(email)) {
            return res.status(400).json({ message: 'Invalid email address' });
        }

        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({
            name,
            email,
            password: hashedPassword,
        });
        res.status(201).json({ message: 'User created successfully' });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        if (!validateEmail(email)) {
            return res.status(400).json({ message: 'Invalid email address' });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const accessToken = createAccessToken({ userId: user._id });
        res.status(200).json({ accessToken, user: { ...user._doc, password: undefined }, status: true, msg: "Login successful.." });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
};