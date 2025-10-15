const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
    addressType: {type: String},
    streetAddress: { type: String, required: [true, "Please enter the street address"] },
    city: { type: String, required: [true, "Please enter city"] },
    state: { type: String, required: [true, "Please enter state"] },
    pincode: { type: String, required: [true, "Please enter pincode"] },
    country: { type: String, required: [true, "Please enter country"] }
})

module.exports = mongoose.model("Address", addressSchema);