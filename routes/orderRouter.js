const express = require('express')
const utilities = require("./utility");
const passport = require('passport');
require('../config/passport')(passport);
// add our router 
const orderRouter = express.Router()

// add the order controller
const orderController = require('../controllers/orderController.js')

orderRouter.get('/orders', utilities.isLoggedIn, (req, res) => orderController.viewAllOrders(req, res))

orderRouter.get('/orders/outstanding', utilities.isLoggedIn, (req, res) => orderController.viewOutstandingOrders(req, res))

orderRouter.get('/orders/history', utilities.isLoggedIn, (req, res) => orderController.viewOrderHistory(req, res))

orderRouter.post('/orders/outstanding/updateOrderStatus', utilities.isLoggedIn, (req, res) => orderController.updateOrderStatus(req, res))


// export the router
module.exports = orderRouter