
const express = require('express');

const productController = require('../controller/product');

const router = express.Router();

router.get('/',productController.getAllProduct);
router.get('/detail/:id',productController.getOneProduct);
router.get('/related/category',productController.getCateProduct);


module.exports = router;