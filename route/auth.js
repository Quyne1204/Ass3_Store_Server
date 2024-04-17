
const express = require('express');

const authController = require('../controller/auth');

const router = express.Router();

router.post('/register',authController.postRegister);
router.post('/login',authController.postLogin);
router.get('/checklogin', authController.getCheck);

module.exports = router;