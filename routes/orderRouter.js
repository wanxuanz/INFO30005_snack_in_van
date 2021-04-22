const express = require('express')

// add our router 
const orderRouter = express.Router()

// add the order controller
const orderController = require('../controllers/orderController.js')

// handle the GET request to get all orders
orderRouter.get('/:vanId/orders', (req,res) => orderController.getAllOrders(req,res))

// handle the GET request to get outstanding order
orderRouter.get('/:vanId/orders/outstanding', (req,res) => orderController.getOutstandingOrders(req,res))

// handle the GET request to get one order
orderRouter.get('/:vanId/orders/:orderId', (req,res) => orderController.getOneOrder(req,res))

// handle the POST request to update order status as fulfilled
orderRouter.get('/:vanId/orders/:orderId/update_status', (req,res) => orderController.updateOrderStatus(req,res))

// export the router
module.exports = orderRouter