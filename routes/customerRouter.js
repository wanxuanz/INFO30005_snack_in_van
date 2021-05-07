const express = require('express')

// add our router 
const customerRouter = express.Router()

// add the customer controller
const customerController = require('../controllers/customerController.js');
const foodRouter = require('./foodRouter.js');

//handle the GET request for login
customerRouter.get('/login', function(req, res, next) {
    res.render('login', { layout: 'beforeLogin.hbs' })
});
//handle the POST request for login
customerRouter.post('/login', (req, res) => customerController.getOneCustomer(req, res))

//handle the GET request to register
customerRouter.get('/register', function(req, res) {
    res.render('register', { layout: 'beforeLogin.hbs' })
});

//handle the POST request to register
customerRouter.post('/register', (req, res) => customerController.addOneCustomer(req, res))

//handle the GET request to get the Shopping Cart by the customer id
customerRouter.get('/:_id/shopping-cart', customerController.findCart)

//handle the POST request to remove one food from Shopping Cart by the customer id
customerRouter.post('/:_id/shopping-cart', (req, res) => customerController.removeOneFood(req, res))

// handle the GET request to go to the detail of a customer's newOrders
customerRouter.get('/:_id/newOrders', customerController.getAllCustomernewOrders)

// handle the POST request to add the neworder to orders
customerRouter.post('/:_id/newOrders', (req, res) => customerController.placeOrder(req, res))

// use the foodRouter to handle food detail
customerRouter.use('/', foodRouter)


// export the router
module.exports = customerRouter