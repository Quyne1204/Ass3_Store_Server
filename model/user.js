const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    fullName: {
        type: String,
        required: false
    },
    phoneNumber: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: false
    },
    password: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: false,
    },
    role: {
        type: String,
        enum: ["customer", "admin", "consultant"],
        default: "customer",
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("User", UserSchema);

