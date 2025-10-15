const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    categoryName: { type: String, required: [true, "Please enter category name"] },
    categoryImage: { type: String, required: [true, "Please enter category Image"] },
    categoryDiscription: { type: String, required: [true, "Please enter category description"] },
    myCreatedProduct: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product"
        }
    ]

})

module.exports = mongoose.model("Category", categorySchema);