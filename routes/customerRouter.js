const express = require('express')

// add our router 
const customerRouter = express.Router()

// add the customer controller
const customerController = require('../controllers/customerController.js')


// handle the GET request to go to the detail of a customer
customerRouter.get('/', customerController.getCustomerDetail)


// export the router
module.exports = customerRouter