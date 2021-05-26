const express = require('express')

// add our router 
const orderRouter = express.Router()

// add the order controller
const orderController = require('../controllers/orderController.js')

<<<<<<< Updated upstream
// handle the GET request to get all newOrders
orderRouter.get('/:vanId/newOrders', (req, res) => orderController.getAllnewOrders(req, res))
=======
//orderRouter.get('/orders', (req, res) => orderController.viewAllOrders(req, res))


orderRouter.get('/:orderId/rating', utilities.isLoggedInCustomer, orderController.getRating)

orderRouter.post('/:orderId/rating', utilities.isLoggedInCustomer, orderController.finishRating)
>>>>>>> Stashed changes

// handle the GET request to get outstanding order
orderRouter.get('/:vanId/newOrders/outstanding', (req, res) => orderController.getOutstandingnewOrders(req, res))

// handle the GET request to get one order
orderRouter.get('/:vanId/newOrders/:orderId', (req, res) => orderController.getOneOrder(req, res))

// handle the get request to update order status as fulfilled
orderRouter.get('/:vanId/newOrders/:orderId/update_status', (req, res) => orderController.updatenewOrderstatus(req, res))

// export the router
module.exports = orderRouter