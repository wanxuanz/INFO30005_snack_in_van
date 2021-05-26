const cors = require('cors')

const express = require('express');
const app = express();

// we will use passport.js, so include it
const passport = require('passport');

// we need to use session
const session = require('express-session');

// we can pass messages between app and callbacks
// we will not use it for this app
const flash = require('connect-flash-plus');

// for using JSON Web Tokens (JWT)
const jwt = require('jsonwebtoken');

// we use a few enviornment variables
const dotenv = require('dotenv').config()

// configure passport authenticator
require('./config/passport')(passport);

// Enable cors
app.use(cors())
const validator = require("email-validator");

// setup a session store signing the contents using the secret key
app.use(session({
    secret: process.env.PASSPORT_KEY,
    resave: true,
    saveUninitialized: true
}));

//middleware that's required for passport to operate
app.use(passport.initialize());

// middleware to store user object
app.use(passport.session());

// use flash to store messages
app.use(flash());

// we need to add the following line so that we can access the 
// body of a POST request as  using JSON like syntax
app.use(express.urlencoded({ extended: true }))

var bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json())

//middleware that's required for passport to operate
app.use(passport.initialize());

// middleware to store user object
app.use(passport.session());

// use flash to store messages
app.use(flash());

// we need to add the following line so that we can access the 
// body of a POST request as  using JSON like syntax
app.use(express.urlencoded({ extended: true }))

// handle bar
app.use(express.static('public')) // define where static assets live
const exphbs = require("express-handlebars")

// configure passport authenticator
require('./config/passport')(passport);

app.engine('hbs', exphbs({
    defaultLayout: 'main',
    extname: 'hbs',
    helpers: require(__dirname + "/public/js/helpers.js").helpers
}))

app.set('view engine', 'hbs')

require('./models');

// set up food routes
//const beforeFoodRouter = require('./routes/beforeFoodRouter')
const customerRouter = require('./routes/customerRouter')

// set up van routes
const vanRouter = require('./routes/vanRouter')

// handler for GET home page
app.get('/', (req, res) => {
    if (req.session.email == null) {
        thelayout = 'beforeLogin.hbs'
    } else { thelayout = 'main.hbs' }
    res.render('initialBody', { layout: 'initial' });
})
//handler for GET home page
app.get('/vender', (req, res) => {
    // res.send('<h1>Vender App</h1>')
        res.render('venderHomepage', { layout: "vender_main.hbs" });
})

/*customer home page*/
app.get('/customer', (req, res) => {
    if (req.session.email == null) {
        thelayout = 'beforeLogin.hbs'
    } else { thelayout = 'main.hbs' }
    res.render('index', { layout: thelayout })
})

// handler for newOrders in van requests
app.use('/vender/vans', vanRouter)

// here goes the customer server after the customer has login
app.use('/customer', customerRouter)



// here goes the customer server before the customer has login
//app.use('/customer/menu', beforeFoodRouter)

// //handler for GET home page
// app.get('/vender', (req, res) => {
//     // res.send('<h1>Vender App</h1>')
//         res.render('venderHomepage', { layout: "vender_main.hbs" });
// })

// // handler for newOrders in van requests
// app.use('/vender/vans', vanRouter)

app.all('*', (req, res) => { // 'default' route to catch user errors
    return res.status(404).render('error', { errorCode: '404', message: 'That route is invalid.' })
})

app.listen(process.env.PORT || 3000, () => {
    console.log('The snack app is running')
})