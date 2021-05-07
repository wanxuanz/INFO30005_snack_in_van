const mongoose = require("mongoose")

const foodSchema = new mongoose.Schema({
    name: { type: String, required: true },
    foodId: String,
    description: String,
    price: Number,
    photo: String,
})

const Food = mongoose.model("Food", foodSchema)

module.exports = Food