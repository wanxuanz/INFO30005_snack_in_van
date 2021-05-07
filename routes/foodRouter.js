const express = require('express')

// add our router 
const foodRouter = express.Router()

// add the food controller
const foodController = require('../controllers/foodController.js')

// handle the GET request to get all foods
foodRouter.get('/:_id/menu', foodController.getAllFoods)

// handle the GET request to find one food
foodRouter.get('/:_id/menu/:foodId', foodController.getOneFood)

// handle the GET request to add one food
foodRouter.get('/:_id/menu/:foodId/add', foodController.addFood)

// export the router
module.exports = foodRouter