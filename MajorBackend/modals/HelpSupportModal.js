const mongoose = require("mongoose");

const helpSupportSchema = new mongoose.Schema({
    fname: { type: String, required: [true, "Please enter first name"] },
    lName: { type: String, required: [true, "Please enter  last Name"] },
    email: { type: String, required: [true, "Please enter your email"] },
    issue: { type: String, required: [true, "Please enter product issue"] },
    product: { type: String, required: [true, "Please enter product"] },
    issueImage: { type: String },
    query: { type: String, required: [true, "Please enter any query"] },  
})

module.exports = mongoose.model("Product", helpSupportSchema);