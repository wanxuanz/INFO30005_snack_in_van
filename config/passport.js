require('dotenv').config() // for JWT password key

// used to create our local strategy for authenticating
// using username and password
const LocalStrategy = require('passport-local').Strategy;

// our user model
const { Van } = require('../models/van');
const { Customer } = require('../models/customer');

module.exports = function(passport) {

    // these two functions are used by passport to store information
    // in and retrieve data from sessions. We are using user's object id

    // give you the full detail of a user, but in the section, only remember the _id is enough
    passport.serializeUser(function(van, done) {
        done(null, van._id);
    });

    passport.deserializeUser(function(_id, done) {
        Van.findById(_id, function(err, van) {
            done(err, van);
        });
    });

    // strategy to login
    // this method only takes in username and password, and the field names
    // should match of those in the login form

    // local-login is the name and create a new instance of the localstrategy
    // and the strategy only take two argument, email and passowrd
    passport.use('local-van-login', new LocalStrategy({
            usernameField: 'van_name',
            passwordField: 'van_password',
            passReqToCallback: true
        }, // pass the req as the first arg to the callback for verification 
        function(req, van_name, van_password, done) {
            // you can read more about the nextTick() function here: 
            // https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/
            // we are using it because without it the User.findOne does not work,
            // so it's part of the 'syntax'
            process.nextTick(function() {
                // see if the user with the email exists
                Van.findOne({ 'vanId': van_name }, function(err, van) {
                    // if there are errors, user is not found or password
                    // does match, send back errors
                    if (err)
                        return done(err);
                    if (!van)

                        return done(null, false, req.flash('loginMessage', 'No user found.'));

                    if (!van.validPassword(van_password)) {
                        // false in done() indicates to the strategy that authentication has
                        // failed
                        return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));
                    }
                    // otherwise, we put the user's email in the session
                    else {
                        // in app.js, we have indicated that we will be using sessions
                        // the server uses the included modules to create and manage
                        // sessions. each client gets assigned a unique identifier and the
                        // server uses that identifier to identify different clients
                        // all this is handled by the session middleware that we are using 
                        req.session.van_name = van_name; // for demonstration of using express-session
                        console.log(req.session)
                            // done() is used by the strategy to set the authentication status with
                            // details of the user who was authenticated
                        return done(null, van, req.flash('loginMessage', 'Login successful'));
                    }
                });
            });
        }));



    // for signup
    passport.use('local-van-register', new LocalStrategy({
            usernameField: 'van_name',
            passwordField: 'van_password',
            passReqToCallback: true
        }, // pass the req as the first arg to the callback for verification 

        function(req, van_name, van_password, done) {
            process.nextTick(function() {
                Van.findOne({ 'vanId': van_name }, function(err, existingVan) {
                    // search a user by the username (email in our case)
                    // if user is not found or exists, exit with false indicating
                    // authentication failure
                    if (err) {
                        console.log(err);
                        return done(err);
                    }
                    if (existingVan) {
                        console.log("existing");
                        return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
                    } else {
                        // otherwise
                        // create a new van
                        var newVan = new Van();
                        newVan.vanId = van_name;
                        newVan.password = newVan.generateHash(van_password);
                        // newUser.nameFamily = req.body.nameFamily;
                        // newUser.nameGiven = req.body.nameGiven;
                        // newUser.favourites = [];

                        // put the user's email in the session so that it can now be used for all
                        // communications between the client (browser) and the FoodBuddy app
                        req.session.van_name = van_name;
                        console.log(req.session)

                        // and save the user
                        newVan.save(function(err) {
                            if (err)
                                throw err;

                            return done(null, newVan);
                        });

                        // put the user's email in the session so that it can now be used for all
                        // communications between the client (browser) and the FoodBuddy app
                        // req.session.vanId=van_name;
                        // console.log(req.session)
                    }
                });
            });
        }));




    passport.serializeUser(function(customer, done) {
        done(null, customer._id);
    });

    passport.deserializeUser(function(_id, done) {
        Customer.findById(_id, function(err, customer) {
            done(err, customer);
        });
    });
    // strategy to login
    // this method only takes in username and password, and the field names
    // should match of those in the login form
    passport.use('local-login', new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true
        }, // pass the req as the first arg to the callback for verification 
        function(req, email, password, done) {

            // you can read more about the nextTick() function here: 
            // https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/
            // we are using it because without it the User.findOne does not work,
            // so it's part of the 'syntax'
            process.nextTick(function() {
                // see if the user with the email exists
                Customer.findOne({ 'email': email }, function(err, customer) {
                    // if there are errors, user is not found or password
                    // does match, send back errors
                    if (err)
                        return done(err);
                    if (!customer)
                        return done(null, false, req.flash('loginMessage', 'No user found.'));

                    if (!customer.validPassword(password)) {
                        // false in done() indicates to the strategy that authentication has
                        // failed
                        return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));
                    }
                    // otherwise, we put the user's email in the session
                    else {
                        // in app.js, we have indicated that we will be using sessions
                        // the server uses the included modules to create and manage
                        // sessions. each client gets assigned a unique identifier and the
                        // server uses that identifier to identify different clients
                        // all this is handled by the session middleware that we are using 
                        req.session.email = email;

                        // done() is used by the strategy to set the authentication status with
                        // details of the user who was authenticatedreturn done(null, user, req.flash('loginMessage', 'Login successful'));
                        return done(null, customer, req.flash('loginMessage', 'Login successful'));
                    }
                });
            });

        }));
    // for signup
    passport.use('local-signup', new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true
        }, // pass the req as the first arg to the callback for verification 

        function(req, email, password, done) {
            process.nextTick(function() {
                Customer.findOne({ 'email': email }, function(err, existingCustomer) {
                    // search a user by the username (email in our case)
                    // if user is not found or exists, exit with false indicating
                    // authentication failure
                    if (err) {
                        console.log(err);
                        return done(err);
                    }
                    if (existingCustomer) {
                        console.log("existing");
                        return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
                    } else {
                        // otherwise
                        // create a new user
                        var newCustomer = new Customer();
                        newCustomer.email = email;
                        newCustomer.password = newCustomer.generateHash(password);
                        newCustomer.lastName = req.body.last_name;
                        newCustomer.firstName = req.body.first_name;
                        newCustomer.cart = [];

                        req.session.email = email;
                        // and save the user
                        newCustomer.save(function(err) {
                            if (err)
                                throw err;

                            return done(null, newCustomer);
                        });
                    }
                });
            });
        }));
};