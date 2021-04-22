const mongoose = require("mongoose")

const orderSchema = new mongoose.Schema({
    foodId: {type: mongoose.Schema.Types.ObjectId, ref: 'Food'}
})

const customerSchema = new mongoose.Schema({ 
firstName: String,
lastName: String,
customerId: String,
currentOrder: [orderSchema]
})

// compile the Schemas into Models
const Customer = mongoose.model("Customer", customerSchema) 
const Order = mongoose.model("Order", orderSchema)

// export  schema
module.exports = {Customer, Order}