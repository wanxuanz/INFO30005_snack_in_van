const mongoose = require("mongoose")

const bcrypt   = require('bcrypt-nodejs')

const VenderOrderSchema = new mongoose.Schema({
  orderId: {type: mongoose.Schema.Types.ObjectId, ref: 'Order'}
})

const vanSchema = new mongoose.Schema({
  vanId: {type: String, require: true},
  locationX: Number,
  locationY: Number,
  location: String,
  orders:[VenderOrderSchema],
  // status: {type: String, default: "close"},
  status: String,
  password: {type: String, require: true}
})

// method for generating a hash; used for password hashing
vanSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
};

// checks if password is valid
vanSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

const Van = mongoose.model("vans", vanSchema)
const VanderOrder = mongoose.model("VanderOrder", VenderOrderSchema)

module.exports = {
  Van,VanderOrder
}