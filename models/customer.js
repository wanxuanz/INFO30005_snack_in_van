const mongoose = require("mongoose")

const customerSchema = new mongoose.Schema({ 
firstName: {type: String, required: true},
lastName: String,
customerId: Number,
})

const Customer = mongoose.model("Customer", customerSchema) 

module.exports = Customer