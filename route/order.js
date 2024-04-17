
const express = require('express');

const orderController = require('../controller/order');

const router = express.Router();

router.post('/checkout',orderController.checkOut);
router.get('/history/:id',orderController.getOrderbyUser);
router.get('/history/detail/:id',orderController.getOrderbyUserDetail);

// router.post()

module.exports = router;