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

app.use((req, res, next) => {
    res.setHeader(
        "Access-Control-Allow-Origin",
        "https://store-client-b886c.web.app"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS,CONNECT,TRACE"
    );
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Content-Type, Authorization, X-Content-Type-Options, Accept, X-Requested-With, Origin, Access-Control-Request-Method, Access-Control-Request-Headers"
    );
    res.setHeader("Access-Control-Allow-Credentials", true);
    res.setHeader("Access-Control-Allow-Private-Network", true);
    //  Firefox caps this at 24 hours (86400 seconds). Chromium (starting in v76) caps at 2 hours (7200 seconds). The default value is 5 seconds.
    res.setHeader("Access-Control-Max-Age", 7200);

    next();
});

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