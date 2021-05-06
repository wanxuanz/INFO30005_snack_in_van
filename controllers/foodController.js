const mongoose = require("mongoose")

// import food model
const Food = mongoose.model("Food")
const Customer = mongoose.model("Customer")
const Cart =  mongoose.model("Cart")

// get all foods
const getAllFoodsBefore = async(req, res) => {
    try {
        const foods = await Food.find().lean()
            // return res.send(foods)
        res.render('beforefoodlist', { "foods": foods, layout: 'beforeLogin.hbs' })
    } catch (err) {
        res.status(400)
        return res.send("Database query failed")
    }
}

const getAllFoods = async(req, res) => {
    try {
        const customer = await Customer.findOne({ "_id": req.params._id }).lean()
        const foods = await Food.find().lean()
            // return res.send(foods)
        // console.log(customer._id)
        res.render('foodlist', { "foods": foods ,"thiscustomer": customer})
    } catch (err) {
        res.status(400)
        return res.send("Database query failed")
    }
}

// find one food by their id
const getOneFoodBefore = async(req, res) => {
    try {
        const oneFood = await Food.findOne({ "foodId": req.params.foodId }).lean()
        if (oneFood === null) { // no food found in database
            res.status(404)
            return res.send("Food not found.")
        }
        res.render('showFoodBefore', { "thisfood": oneFood, layout: 'beforeLogin.hbs' })
    } catch (err) { // error occurred
        res.status(400)
        return res.send("Database query failed")
    }
}

const getOneFood = async(req, res) => {
    try {
        // console.log(req.params.foodId)
        const customer = await Customer.findOne({ "_id": req.params._id }).lean()
        const oneFood = await Food.findOne({ "foodId": req.params.foodId }).lean()
        if (oneFood === null) { // no food found in database
            res.status(404)
            return res.send("Food not found.")
        }
        console.log(customer)
        res.render('showFood', { "thisfood": oneFood ,"thiscustomer": customer})
    } catch (err) { // error occurred
        res.status(400)
        return res.send("Database query failed")
    }
}

// add food to customer cart
const addFood = async (req, res) => {

    // assume the login customer with customerid 1001
    // let thisCustomer = await Customer.findOne({ customerId: '1001' })
    const thisCustomer = await Customer.findOne({ "_id": req.params._id })
    let addFood = await Food.findOne({ foodId: req.params.foodId })

  // add food to customer's order list
  orderRecord = new Cart({foodId: addFood._id})
  thisCustomer.cart.push(orderRecord)

  await thisCustomer.save()

    // show the new customer record
    result = await Customer.findOne({ "_id": req.params._id }).populate('cart.foodId', 'name')
    res.send(result)
}


// remember to export the functions
module.exports = {
  getAllFoods,
  getOneFood,
  addFood,
  getAllFoodsBefore,
  getOneFoodBefore
}