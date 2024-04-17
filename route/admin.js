
const express = require('express');

const adminController = require('../controller/admin');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/',auth,adminController.getHome);
router.get('/infoboard',auth,adminController.getInforBoard);
router.get('/products',auth,adminController.getProduct);
router.get('/orders',auth,adminController.getOrder);

module.exports = router;