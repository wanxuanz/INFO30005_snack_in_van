const express = require('express');
const app = express();
var bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.json())

// handle bar
app.use(express.static('public')) // define where static assets live
const exphbs = require("express-handlebars")

app.engine('hbs', exphbs({
    defaultLayout: 'main',
    extname: 'hbs'
}))

app.set('view engine', 'hbs')

require('./models');

// set up food routes
const beforeFoodRouter = require('./routes/beforeFoodRouter')
const customerRouter = require('./routes/customerRouter')

// set up van routes
const vanRouter = require('./routes/vanRouter')

// handler for GET home page
app.get('/', (req, res) => {
    res.render('index', { layout: "beforeLogin.hbs" });
})
/*customer home page*/
app.get('/customer', (req, res) => {
    res.render('index', { layout: "beforeLogin.hbs" });
})

// here goes the customer server
app.use('/customer', customerRouter)

app.use('/customer/menu', beforeFoodRouter)


// handler for newOrders in van requests
app.use('/vender/vans', vanRouter)

//handler for GET home page
app.get('/vender', (req, res) => {
    res.send('<h1>Vender App</h1>')
})

app.listen(process.env.PORT || 3000, () => {
    console.log('The snack app is running')
})