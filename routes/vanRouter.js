const express = require('express')
const utilities = require("./utility");
// we will use the passport strategies we defined in 
// passport.js file in config folder to signup and login 
// a van.
const passport = require('passport');
require('../config/passport')(passport);

// add van router 
const vanRouter = express.Router()

// add the van controller and order router
const vanController = require('../controllers/vanController.js')
const orderRouter = require('./orderRouter.js')

// handle the GET request to get all newOrders
vanRouter.get('/', (req, res) => vanController.getAllVans(req, res))

// POST login form -- authenticate user
// http:localhost:5000/user/login
vanRouter.post('/login', passport.authenticate('local-van-login', {
    successRedirect: '/vender/vans/send_location', // redirect to the homepage
    failureRedirect: '/vender', // redirect back to the login page if there is an error
    failureFlash: true // allow flash messages
}));


vanRouter.get("/register", (req, res) => {
    res.render('venderRegister', { layout: "vender_main.hbs" });
});

// POST - user submits the signup form -- signup a new user
// http:localhost:5000/user/signup
vanRouter.post('/register', passport.authenticate('local-van-register', {
    successRedirect: '/vender/vans/send_location', // redirect to the homepage
    failureRedirect: '/vender', // redirect to signup page
    failureFlash: true // allow flash messages
}));
//handle send locations
// vanRouter.get('/send_location', (req, res) => vanController.sendLocation(req, res))

vanRouter.get("/send_location", utilities.isLoggedIn, (req, res) => {
    res.render('setLocation', { layout: "vender_main.hbs" });
});
vanRouter.post('/send_location', utilities.isLoggedIn, (req, res) => vanController.updateLocation(req, res))

// vanRouter.get('/orders', (req, res) => vanController.viewAllOrders(req, res))

vanRouter.use('/', orderRouter)

// export the router
module.exports = vanRouter