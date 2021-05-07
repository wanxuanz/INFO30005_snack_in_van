const express = require('express')

// add our router 
const beforeFoodRouter = express.Router()

// add the food controller
const foodController = require('../controllers/foodController.js')

// handle the GET request to get all foods
beforeFoodRouter.get('/', foodController.getAllFoodsBefore)

// handle the GET request to get one food
beforeFoodRouter.get('/:foodId', foodController.getOneFoodBefore)

// export the router
module.exports = beforeFoodRouter