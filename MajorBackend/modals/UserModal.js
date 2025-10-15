const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: { type: String, required: [true, "Please enter your name"] },
    email: { type: String, required: [true, "Please enter your email"] },
    password: { type: String, required: [true, "Please enter your password"] },
    role: {
        type: String,
        enum: ["buyer", "admin", "seller"],
        default: "buyer"
    },

    otp: { type: Number },
    verifyStatus: { type: Boolean, default: false },
    phone_no: { type: String },
    dob: { type: String },
    gender: {
        type: String,
        enum: ["male", "female", "Others"]
    },
    profileImage: { type: String },
    Language: { type: String },
    myPurchaseProduct: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product"
        }
    ],
    myCreatedProduct: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product"
        }
    ],
    Address:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Address"
    }
}, { timestamps: true })

module.exports = mongoose.model("User", userSchema);
