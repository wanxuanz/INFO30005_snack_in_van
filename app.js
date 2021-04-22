const express = require('express');
const Food = require('./models/food.js');
const app = express();
app.use(express.json())

require('./models');
// set up food routes
const foodRouter = require('./routes/foodRouter')
const customerRouter = require('./routes/customerRouter')

// handler for GET home page
app.get('/', (req, res) => {
    res.send('<h1>Snack in a Van</h1>')
})

// here goes the customer server
app.use('/customer', customerRouter)

app.use('/customer/menu', foodRouter)

// here goes the vendor server


app.listen(process.env.PORT || 3000, () => {
    console.log('The snack app is running')
})