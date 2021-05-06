const express = require('express');
const app = express();
app.use(express.json())

// handle bar
app.use(express.static('public'))	// define where static assets live
const exphbs = require("express-handlebars")

app.engine('hbs',exphbs({
  defaultLayout: 'main',
  extname: 'hbs'
}))
app.set('view engine','hbs')


require('./models');
// set up food routes
const foodRouter = require('./routes/foodRouter')
const customerRouter = require('./routes/customerRouter')

// set up van routes
const vanRouter = require('./routes/vanRouter')

// handler for GET home page
app.get('/', (req, res) => {
<<<<<<< Updated upstream
    // res.send('<h1>Snack in a Van</h1>')
    res.render('index');
=======
    console.log('connected')
    res.render('index',{layout: "beforeLogin.hbs"});
>>>>>>> Stashed changes
})

// here goes the customer server
app.use('/customer', customerRouter)

<<<<<<< Updated upstream
app.use('/customer/menu', foodRouter)
=======
app.use('/customer/menu', beforeFoodRouter)

// app.use('/customer/:_id/menu', foodRouter)
>>>>>>> Stashed changes

// handler for orders in van requests
app.use('/vender/vans', vanRouter)

//handler for GET home page
app.get('/vender', (req, res) => {
    res.send('<h1>Vender App</h1>')
})

app.listen(process.env.PORT || 3000, () => {
    console.log('The snack app is running')
})