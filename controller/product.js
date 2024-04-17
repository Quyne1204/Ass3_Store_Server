const Product = require('../model/product');

exports.getAllProduct = async (req, res, next) => {
    Product.find().then(result => {
        return res.status(200).json(result);
    })
}
exports.getOneProduct = async (req, res, next) => {
    Product.findById(req.params.id).then(result => {
        return res.status(200).json(result);
    })
}
exports.getCateProduct = async (req, res, next) => {
    Product.find({ category: req.query.cate })
        .then(result => {
            return res.status(200).json(result);
        })
}

