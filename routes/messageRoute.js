// messageRoutes.js

const express = require('express');
const router = express.Router();
const ProtectRoute = require('../middleware/protected');
const { sendMsg } = require('../controllers/messageControl');

router.post('/user/:id',ProtectRoute, sendMsg);

module.exports = router;
 