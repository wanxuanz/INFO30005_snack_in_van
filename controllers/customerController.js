const mongoose = require("mongoose")
// import customer model
const Customer = mongoose.model("Customer")

const getAllCustomers = async (req, res) => {
    try {
      const customers = await Customer.find({},{firstName: true, customerId: true}).populate('currentOrder.foodId','name')
      return res.send(customers)
    } catch (err) {
      res.status(400)
      return res.send("Database query failed")
    } 
  }

  // catch a POST request and we can add more customer in our database
const addCustomer = async (req, res) => {
  const customer = new Customer(req.body)   // construct a new Author object from body of POST
  console.log(req.body)
  try {
      let result = await customer.save()  // save new author object to database
      return res.send(result)           // return saved object to sender
  } catch (err) {   // error detected
      res.status(400)
      return res.send("Database insert failed")
  }
}

  // remember to export the functions
module.exports = {
  getAllCustomers, addCustomer
  }