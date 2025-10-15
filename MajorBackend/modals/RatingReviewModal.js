const mongoose = require("mongoose");

const RatingReviewSchema = new mongoose.Schema({
    rating: { type: Number, required: [true, "Please enter category rating"] },
    review: { type: String, required: [true, "Please enter category review"] }
})

module.exports = mongoose.model("RatingReview", RatingReviewSchema);