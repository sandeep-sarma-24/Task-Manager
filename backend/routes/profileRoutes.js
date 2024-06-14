const express = require('express');
const routwe = express.Router();
const { getProfile } = require('../controllers/profileControllers');
const { verifyAccessToken } = require('../middlewares/authorization');
const router = require('./authRoutes');

router.get('/profile', verifyAccessToken, getProfile);

module.exports = router;