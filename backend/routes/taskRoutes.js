const express = require('express');
const router = express.Router();
const { getTasks, getTaskById, createTask, updateTask, deleteTask } = require('../controllers/taskControllers');

const { verifyAccessToken } = require('../middlewares/authorization');
router.get('/',verifyAccessToken, getTasks);
router.get('/:id',verifyAccessToken, getTaskById);
router.post('/',verifyAccessToken, createTask);
router.put('/:id',verifyAccessToken, updateTask);
router.delete('/:id',verifyAccessToken, deleteTask);

module.exports = router;