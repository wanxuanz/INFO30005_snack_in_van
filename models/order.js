const mongoose = require("mongoose")

// define item schema
const itemSchema = new mongoose.Schema({
    foodId: { type: mongoose.Schema.Types.ObjectId, ref: 'Food' },
})

// define order schema
const newOrderschema = new mongoose.Schema({
    vanId: { type: String, require: true },
    time: { type: String, required: true },
    dateCompare: { type: Date, default: Date.now },
    customerId: { type: String, required: true },
    items: [itemSchema],
    total: { type: String, required: true },
    status: { type: String, required: true }
})


const Order = mongoose.model("newOrders", newOrderschema)
const Item = mongoose.model("Item", itemSchema)

module.exports = Order
module.exports = Item