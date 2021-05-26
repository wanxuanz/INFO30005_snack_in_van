const mongoose = require("mongoose")

// define item schema
const itemSchema = new mongoose.Schema({
    foodId: { type: mongoose.Schema.Types.ObjectId, ref: 'Food' },
})

// define order schema
const newOrderschema = new mongoose.Schema({
    vanId: { type: String, require: true },
    time: { type: String, required: true },
    customerId: { type: String, required: true },
    items: [itemSchema],
    total: { type: String, required: true },
<<<<<<< Updated upstream
    status: { type: String, required: true }
=======
    status: { type: String, required: true },
    visibility: { type: Boolean, default: true },
    visibility_not_change: { type: String, required: true, default: "visible" },
    rating: { type: String},
    notshowrating:{type: Boolean, default: true}
>>>>>>> Stashed changes
})


const Order = mongoose.model("newOrders", newOrderschema)
const Item = mongoose.model("Item", itemSchema)

module.exports = Order
module.exports = Item