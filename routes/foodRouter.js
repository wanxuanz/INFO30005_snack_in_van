const express = require('express')

// add our router 
const foodRouter = express.Router()

// add the food controller
const foodController = require('../controllers/foodController.js')

// handle the GET request to get all foods
foodRouter.get('/', foodController.getAllFoods)

// handle the GET request to get one food
foodRouter.get('/:foodId', foodController.getOneFood)
// export the router
module.exports = foodRouter