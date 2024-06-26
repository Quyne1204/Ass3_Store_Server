const cors = require('cors');
const express = require('express');
const dotenv = require('dotenv');

const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const auth = require("./route/auth");
const product = require("./route/product");
const order = require("./route/order");
const admin = require("./route/admin");

const app = express();
dotenv.config();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/auth', auth);
app.use('/product', product);
app.use('/order', order);
app.use('/admin', admin);

const port = process.env.PORT || 4000;

mongoose.connect(process.env.MONGO_DB)
    .then(result => {
        app.listen(port);
    })
    .catch(err => console.log(err));