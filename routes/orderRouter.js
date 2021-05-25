const express = require('express')
const utilities = require("./utility");
// add our router 
const orderRouter = express.Router()

// add the order controller
const orderController = require('../controllers/orderController.js')

orderRouter.get('/orders', (req, res) => orderController.viewAllOrders(req, res))

orderRouter.get('/:orderId/rating', utilities.isLoggedInCustomer, orderController.getRating)

orderRouter.post('/:orderId/rating', utilities.isLoggedInCustomer, orderController.finishRating)

orderRouter.get('/orders/outstanding', utilities.isLoggedIn, (req, res) => orderController.viewOutstandingOrders(req, res))

orderRouter.get('/orders/history', utilities.isLoggedIn, (req, res) => orderController.viewOrderHistory(req, res))

orderRouter.post('/orders/outstanding/:_id/updateOrderStatus', utilities.isLoggedIn, (req, res) => orderController.updateOrderStatus(req, res))

// export the router
module.exports = orderRouter