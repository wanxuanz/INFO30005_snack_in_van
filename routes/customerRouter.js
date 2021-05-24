const express = require('express')
const utilities = require("./utility");
// we will use the passport strategies we defined in 
// passport.js file in config folder to signup and login 
// a user.
const passport = require('passport');
require('../config/passport')(passport);

// add our router 
const customerRouter = express.Router()

// add the customer controller
const customerController = require('../controllers/customerController.js');
const foodRouter = require('./foodRouter.js');

customerRouter.get("/login", (req, res) => {
    res.render('login', { layout: 'beforeLogin.hbs' });
});

//handle the GET request for login
// customerRouter.get('/login', function(req, res, next) {
//     res.render('login', { layout: 'beforeLogin.hbs' })
// });
//handle the POST request for login
customerRouter.post('/login', passport.authenticate('local-login', {
    successRedirect: '/customer', // redirect to the homepage
    failureRedirect: '/customer/login', // redirect back to the login page if there is an error
    failureFlash: true // allow flash messages
}));

//handle the GET request to register
customerRouter.get('/register', function(req, res) {
    res.render('register', { layout: 'beforeLogin.hbs' })
});

//handle the POST request to register
customerRouter.post('/register', passport.authenticate('local-signup', {
    successRedirect: '/customer', // redirect to the homepage
    failureRedirect: '/customer/register/', // redirect to signup page
    failureFlash: true // allow flash messages
}));

// LOGOUT
customerRouter.post('/logout', function(req, res) {
    // save the favourites
    req.logout();
    req.flash('');
    res.redirect('/customer/');
});



//handle the GET request to get the Shopping Cart by the customer id
customerRouter.get('/shopping-cart', utilities.isLoggedInCustomer, customerController.findCart)

//handle the POST request to remove one food from Shopping Cart by the customer id
customerRouter.post('/shopping-cart', utilities.isLoggedInCustomer, (req, res) => customerController.removeOneFood(req, res))

// handle the GET request to go to the detail of a customer's Orders
customerRouter.get('/Orders', utilities.isLoggedInCustomer, customerController.getAllCustomerOrders)

// handle the POST request to add the neworder to orders
customerRouter.post('/Orders', utilities.isLoggedInCustomer, (req, res) => customerController.placeOrder(req, res))

// use the foodRouter to handle food detail
customerRouter.use('/', foodRouter)

//logout
customerRouter.get('/logout', function(req, res) {

    req.logout();
    req.flash('');
    req.session.destroy();
    res.redirect('/customer/');
});


// export the router
module.exports = customerRouter