const express = require('express');
const Food = require('./models/food.js');
const app = express();

require('./models');
// set up food routes
const foodRouter = require('./routes/foodRouter')

// handler for GET home page
app.get('/', (req, res) => {
    res.send('<h1>Snack in a Van</h1>')
})
// app.get('/menu', async (req,res) =>{
//     result = await Food.find()
//     res.send(result)
// })
// handler for menu requests
// food routes are added onto the end of '/menu'

app.use('/menu', foodRouter)

app.listen(process.env.PORT || 3000, () => {
    console.log('The snack app is running')
})