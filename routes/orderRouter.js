const express = require('express')

// add our router 
const orderRouter = express.Router()

// add the order controller
const orderController = require('../controllers/orderController.js')

orderRouter.get('/orders', (req, res) => orderController.viewAllOrders(req, res))



// export the router
module.exports = orderRouter