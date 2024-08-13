const express = require("express");
const { registerUser, fetchUserById, loginUser, logoutUser } = require('../controllers/userControl');
const router = express.Router();
// const {ProtectRoute} = require('../middleware/protected')

router.post('/',registerUser)
router.post('/fecthUser/:id',fetchUserById)
router.post('/login',loginUser)
router.get('/logout',logoutUser)

module.exports = router; 