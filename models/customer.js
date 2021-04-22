const mongoose = require("mongoose")

const cartSchema = new mongoose.Schema({
    foodId: {type: mongoose.Schema.Types.ObjectId, ref: 'Food'}
})

const customerSchema = new mongoose.Schema({ 
firstName: String,
lastName: String,
customerId: String,
cart: [cartSchema]
})

// compile the Schemas into Models
const Customer = mongoose.model("Customer", customerSchema) 
const Cart = mongoose.model("Cart", cartSchema)

// export  schema
module.exports = {Customer, Cart}