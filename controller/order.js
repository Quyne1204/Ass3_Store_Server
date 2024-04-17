const Order = require("../model/order");
const User = require("../model/user");
const nodemailer = require("nodemailer");

const fs = require('fs');
const path = require('path');
const handlebars = require('handlebars');

// Đăng ký helper "formatPrice"
handlebars.registerHelper('formatPrice', function (price) {
    const formattedPrice = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
    return new handlebars.SafeString(formattedPrice);
});

// Đường dẫn tới tệp tin HTML mẫu
const templateFilePath = path.join(__dirname, '../mailer/mail.hbs');

// Đọc nội dung từ tệp tin HTML mẫu
const templateContent = fs.readFileSync(templateFilePath, 'utf-8');

// Biên dịch template Handlebars
const compiledTemplate = handlebars.compile(templateContent);

exports.checkOut = async (req, res, next) => {
    // Dữ liệu đơn hàng
    try {
        const orderData = {
            user: {
                fullName: req.body.fullName,
                phone: req.body.phone,
                address: req.body.address,
            },
            product: req.body.cart,
            total_price: req.body.total
        };

        const htmlContent = compiledTemplate(orderData);

        const order = new Order({
            user: {
                _id: req.body.id,
                fullName: req.body.fullName,
                email: req.body.email,
                phone: req.body.phone,
                address: req.body.address
            },
            product: req.body.cart,
            total_price: req.body.total,
        });
        // console.log(order);

        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false, // Use `true` for port 465, `false` for all other ports
            auth: {
                user: "quynvfx20757@funix.edu.vn",
                pass: "njzx rmjt glpy jygm",
            },
        });

        await User.findByIdAndUpdate(
            { _id: req.body.id },
            {
                $set: {
                    fullName: req.body.fullName,
                    email: req.body.email,
                    phoneNumber: req.body.phone,
                    address: req.body.address,
                }
            }
        )

        order.save()
            .then(async (item) => {
                const info = await transporter.sendMail({
                    from: '"Maddison Foo Koch 👻" <quynvfx20757@funix.edu.vn>', // sender address
                    to: req.body.email, // list of receivers
                    subject: "Hello ✔", // Subject line
                    text: "Hello world?", // plain text body
                    html: htmlContent, // html body
                });
                return info;
            })
            .then(item => {
                return res.status(200).json({ order, message: "Đơn hàng của bạn đã tạo thành công vui lòng check qua email" })
            })
    } catch (error) {
        console.error(error);
    }
}

exports.getOrderbyUser = async (req, res, next) => {
    // console.log(req.params.id)
    Order.find({
        'user._id': req.params.id
    }).then(item => res.status(200).json(item));
}
exports.getOrderbyUserDetail = async (req, res, next) => {
    Order.find({
        _id: req.params.id
    }).then(item => res.status(200).json(item));
}