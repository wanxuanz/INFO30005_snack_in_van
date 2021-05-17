const express = require('express')
const utilities = require("./utility");
// add our router 
const foodRouter = express.Router()

// add the food controller
const foodController = require('../controllers/foodController.js')

// handle the GET request to get all foods
foodRouter.get('/menu', foodController.getAllFoods)

// handle the GET request to find one food
foodRouter.get('/menu/:foodId', foodController.getOneFood)

// handle the GET request to add one food
foodRouter.get('/menu/:foodId/add', utilities.isLoggedIn,foodController.addFood)

// export the router
module.exports = foodRouter