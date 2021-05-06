const express = require('express')

// add van router 
const vanRouter = express.Router()

// add the van controller and order router
const vanController = require('../controllers/vanController.js')
const orderRouter = require('./orderRouter.js')

// handle the GET request to get all newOrders
vanRouter.get('/', (req, res) => vanController.getAllVans(req, res))

//get one van
vanRouter.get('/:vanId', (req, res) => vanController.getOneVan(req, res))

//use the order router
vanRouter.use('/', orderRouter)

// handle the GET request to get all newOrders
vanRouter.get('/:vanId/update_status', (req, res) => vanController.updateVanStatus(req, res))

//handle send locations
vanRouter.get('/:vanId/send_location', (req, res) => vanController.sendLocation(req, res))

//handle change and send locations
vanRouter.post('/:vanId/send_location', (req, res) => vanController.changeAndSendLocation(req, res))

// export the router
module.exports = vanRouter