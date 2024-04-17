const cors = require('cors');
const express = require('express');
const jwt = require('jsonwebtoken');

const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const auth = require("./route/auth");
const product = require("./route/product");
const order = require("./route/order");
const admin = require("./route/admin");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/auth', auth);
app.use('/product', product);
app.use('/order', order);
app.use('/admin', admin);


mongoose.connect('mongodb+srv://nvq12042003:quy12042003@store.wmoa2jh.mongodb.net/store?retryWrites=true&w=majority&appName=Store')
    .then(result => {
        app.listen(5000);
    })
    .catch(err => console.log(err));