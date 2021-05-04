const express = require('express')
const app = express()
var bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));


app.use(express.json())  // replaces body-parser

app.use(express.static('public'))
const exphbs = require("express-handlebars")

app.engine('hbs',exphbs({
  defaultLayout: 'main',
  extname: 'hbs'
}))
app.set('view engine','hbs')

// connect to models to routes
require('./models') 
const customerRouter=require('./routes/customerRouter')

//GET home page
app.get('/', (req, res) => {
  console.log('connected')
  // res.send('<h1>Library System</h1>')
  res.render('index');
  
})

// Handle author-management requests
// the author routes are added onto the end of '/author-management'
app.use('/customer',customerRouter)
app.listen(process.env.PORT || 3000, () => {
  console.log("The library app is running!")
})
