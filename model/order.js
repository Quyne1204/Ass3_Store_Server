const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    user: {
        _id: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        fullName: String,
        email: String,
        phone: String,
        address: String,
    },
    product: [{
        _id: {
            type: Schema.Types.ObjectId,
            ref: 'Product'
        },
        name: String,
        price: String,
        quantity: String,
        total:String,
        img: String,
    }],
    total_price: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ["pending", "shipping", "completed", "canceled"],
        default: "pending",
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Order", OrderSchema);

