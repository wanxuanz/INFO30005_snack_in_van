const express = require('express')

// add our router 
const beforeFoodRouter = express.Router()

// add the food controller
const foodController = require('../controllers/foodController.js')

// handle the GET request to get all foods
beforeFoodRouter.get('/', foodController.getAllFoodsBefore)

beforeFoodRouter.get('/:foodId', foodController.getOneFoodBefore)

// handle the GET request to add one food
//foodRouter.get('/:foodId/add', foodController.addFood)

// export the router
module.exports = beforeFoodRouter