const express = require("express");
const { registerUser, fetchUserById, loginUser } = require('../controllers/userControl');
const router = express.Router();

router.post('/',registerUser)
router.post('/fecthUser/:id',fetchUserById)
router.post('/login',loginUser)

module.exports = router; 