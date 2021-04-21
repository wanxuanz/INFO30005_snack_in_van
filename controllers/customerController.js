const mongoose = require("mongoose")
// import customer model
const Customer = mongoose.model("Customer")

const getCustomerDetail = async (req, res) => {
    try {
      const customers = await Customer.find({},{firstName: true, customerId: true})
      return res.send(customers)
    } catch (err) {
      res.status(400)
      return res.send("Database query failed")
    } 
  }
  
  // remember to export the functions
module.exports = {
    getCustomerDetail
  }