// step-1 
const mongoose = require("mongoose");

//step-2
const productSchema = new mongoose.Schema({
    productName: { type: String, required: true },
    productPrice: { type: Number, required: true },
    productQuantity: { type: Number, default: 1 },
    productDesc: {type: String, required: true},
    productImage: {type: String, required: true},
    productCategoryId: { type: String, required: true }
})

//step-3
module.exports = mongoose.model("Product", productSchema)