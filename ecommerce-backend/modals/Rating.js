import mongoose from "mongoose";

const ratingSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    ratings: {
        type: Number,
        required: true
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    },
    reviews: {
        type: String,   
    }
})

const RatingData = mongoose.model('rating', ratingSchema)
export default RatingData