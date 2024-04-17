const User = require("../model/user");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.postRegister = async (req, res, next) => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const checkEmail = await User.findOne({ email: req.body.email });
    const checkPhone = await User.findOne({ phoneNumber: req.body.phoneNumber });

    const error = {};
    if (checkEmail) {
        error.email = "Email exists";
    }
    if (checkPhone) {
        error.phone = "Phone exists";
    }
    if (checkEmail || checkPhone) {
        return res.status(400).json({error:error});
    }
    // console.log(req.body);
    const user = new User({ ...req.body, password: hash });
    user.save().then((item) => { return res.status(200).json({ message: "Created User" });
 });
}

exports.postLogin = async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return res.status(404).json({ message: "Email not fount" });
    }

    const checkPass = await bcrypt.compare(req.body.password, user.password);
    if (!checkPass) {
        return res.status(404).json({ message: "Wrong password!" });
    }

    // res.setHeader('set-cookie',"username=quyne");

    const accessToken = jwt.sign({
        id: user._id,
    }, "funix");
    const { password, isAdmin, ...ortherDetails } = user._doc;

    return res.status(200).json({ detail: { ...ortherDetails }, isAdmin, accessToken });
};
exports.getCheck = (req, res, next) => {
    const token = req.headers.cookies;
    const success = jwt.verify(token, 'funix');

    if (success) {
        User.findOne({ _id: success.id })
            .then(user => {
                req.user = user;
                res.status(200).json(user);
                next();
            })
    } else {
        res.status(400).json({ message: "Ban can dang nhap" });
    }
}