const mongoose = require('mongoose');
 
//const cartSchema = new mongoose.Schema({
//     foodId: { type: mongoose.Schema.Types.ObjectId, ref: 'Food' },
// })

const customerSchema = new mongoose.Schema({
    email:String,
    password:String,
    firstName:String,
    lastName:String
    
    

})
//const Cart = mongoose.model("Cart", cartSchema)

const Customer = mongoose.model("customers", customerSchema)

module.exports = {Customer}



