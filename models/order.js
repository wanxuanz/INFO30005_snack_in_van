const mongoose = require("mongoose")

// define item schema
const itemSchema = new mongoose.Schema({
    itemId: { type: mongoose.Schema.Types.ObjectId, ref: 'Food'},
})

// define order schema
const orderSchema = new mongoose.Schema({
    orderId: { type: String, required: true, unique: true},
    vanId:{type: String, require: true},
    time: { type: String, required: true},
    customerId: { type: String, required: true},
    customerName: { type: String},
    items: [itemSchema],
    total: { type: String, required: true},
    status: { type: String, required: true}
})


const Order = mongoose.model("orders", orderSchema)
const Item = mongoose.model("Item", orderSchema)

module.exports = Order
module.exports = Item