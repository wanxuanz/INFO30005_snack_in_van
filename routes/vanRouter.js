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
    res.render('venderRegister', { layout: "initial.hbs" });
});

// POST - user submits the signup form -- signup a new user
// http:localhost:5000/user/signup
vanRouter.post('/register', passport.authenticate('local-van-register', {
    successRedirect: '/vender/vans/send_location', // redirect to the homepage
    failureRedirect: '/vender', // redirect to signup page
    failureFlash: true // allow flash messages
}));
//handle send locationsx
vanRouter.get("/send_location", utilities.isLoggedIn, (req, res) => {
    res.render('setLocation', { layout: "vender_main.hbs" });
});
vanRouter.post('/send_location', utilities.isLoggedIn, (req, res) => vanController.updateLocation(req, res))

// go to home page
vanRouter.get("/home", utilities.isLoggedIn, utilities.isSendLocation,(req, res) => vanController.getOneVan(req, res))


// update van status
vanRouter.post('/home/updateVanStatus', utilities.isLoggedIn, utilities.isSendLocation, (req, res) => vanController.updateVanStatus(req, res))

vanRouter.use('/', orderRouter)

// logout
vanRouter.get('/logout', (req, res) => vanController.logout(req, res))

// vanRouter.get('/logout', function(req, res) {
//     req.logout();
//     req.flash('');
//     req.session.destroy();

//     res.redirect('/vender');
// });

// export the router
module.exports = vanRouter