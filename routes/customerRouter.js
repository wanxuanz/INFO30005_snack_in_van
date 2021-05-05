const express = require('express')

// add our router 
const customerRouter = express.Router()

// add the customer controller
const customerController = require('../controllers/customerController.js');
const foodRouter = require('./foodRouter.js');

// // handle the GET request to go to the detail of a customer
// customerRouter.get('/', customerController.getAllCustomers)

// // handle POST requests to add one customer into our database
// customerRouter.post('/', customerController.addCustomer)

/* /go to login.hbs */
customerRouter.get('/login', function(req, res, next) {
    res.render('login', { layout: 'beforeLogin.hbs' })
        //res.sendfile('./views/login.html'); 
});

customerRouter.post('/login', (req, res) => customerController.getOneCustomer(req, res))


customerRouter.get('/register', function(req, res) {
    res.render('register', { layout: 'beforeLogin.hbs' })
});

customerRouter.post('/register', (req, res) => customerController.addOneCustomer(req, res))

//handle the GET request to get the Shopping Cart
customerRouter.get('/:_id/shopping-cart', customerController.findCart)

customerRouter.post('/:_id/shopping-cart', (req, res) => customerController.removeOneFood(req, res))

customerRouter.use('/', foodRouter)


// export the router
module.exports = customerRouter