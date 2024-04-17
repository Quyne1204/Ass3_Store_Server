const Order = require("../model/order");
const User = require("../model/user");
const Product = require("../model/product");

exports.getHome = (req, res, next) => {
    Order.find()
        .sort({ createdAt: -1 })
        .limit(9)
        .then((order) => {
            res.status(200).json(order);
        })
        .catch((err) => {
            console.log(err);
        });
}

exports.getInforBoard = (req, res, next) => {
    let countUser = 0;
    let order = 0;
    let earnings = 0;
    let balance = 0;

    const startDate = new Date('2024-01-01');
    const currentDate = new Date();
    const startYear = startDate.getFullYear();
    const startMonth = startDate.getMonth();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();

    const totalMonths = (currentYear - startYear) * 12 + (currentMonth - startMonth) + 1;

    Promise.all([
        User.find().then((users) => {
            countUser = users.length;
        }),
        Order.find().then((result) => {
            order = result.length;
            earnings = result.reduce((total, order) => total + order.total_price, 0);
            balance = earnings / totalMonths;
        }),

    ])
        .then(() => {
            res.status(200).json({ countUser, order, earnings, balance });
        })
        .catch((err) => {
            console.log(err);
        });

};

exports.getProduct = (req, res, next) => {
    Product.find()
        .then((product) => {
            res.status(200).json(product);
        })
        .catch((err) => {
            console.log(err);
        });
}
exports.getOrder = (req, res, next) => {
    Order.find()
        .then((product) => {
            res.status(200).json(product);
        })
        .catch((err) => {
            console.log(err);
        });
}