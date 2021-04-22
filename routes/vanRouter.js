const express = require('express')

// add van router 
const vanRouter = express.Router()

// add the van controller
const vanController = require('../controllers/vanController.js')
const orderRouter = require('./orderRouter.js')

// handle the GET request to get all orders
vanRouter.get('/', (req,res) => vanController.getAllVans(req,res))

//get one van
vanRouter.get('/:vanId', (req,res) => vanController.getOneVan(req,res))

//use the order router
vanRouter.use('/', orderRouter)

// handle the GET request to get all orders
vanRouter.get('/:vanId/update_status', (req,res) => vanController.updateVanStatus(req,res))

// export the router
module.exports = vanRouter