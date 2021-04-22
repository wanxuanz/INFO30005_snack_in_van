const express = require('express');
const app = express();
app.use(express.json())

require('./models');

// set up food routes
const foodRouter = require('./routes/foodRouter')
const customerRouter = require('./routes/customerRouter')

// set up van routes
const vanRouter = require('./routes/vanRouter')

// handler for GET home page
app.get('/', (req, res) => {
    res.send('<h1>Snack in a Van</h1>')
})

// here goes the customer server
app.use('/customer', customerRouter)

app.use('/customer/menu', foodRouter)

// handler for orders in van requests
app.use('/vender/vans', vanRouter)

//handler for GET home page
app.get('/vender', (req, res) => {
    res.send('<h1>Vender App</h1>')
})

app.listen(process.env.PORT || 3000, () => {
    console.log('The snack app is running')
})