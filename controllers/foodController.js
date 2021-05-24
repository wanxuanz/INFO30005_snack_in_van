const mongoose = require("mongoose")
const Food = mongoose.model("Food")
const Customer = mongoose.model("Customer")
const Cart = mongoose.model("Cart")

// get all foods before the customer login in 
// const getAllFoodsBefore = async(req, res) => {
//     try {
//         const foods = await Food.find().lean()
//             // return res.send(foods)
//         res.render('beforefoodlist', { "foods": foods, layout: 'beforeLogin.hbs' })
//     } catch (err) {
//         res.status(400)
//         return res.send("Database query failed")
//     }
// }
// get all foods after the customer has logined in 
const getAllFoods = async(req, res) => {
    try {
        if (req.session.email == null) {
            thelayout = 'beforeLogin.hbs'
        } else { thelayout = 'main.hbs' }
        //const customer = await Customer.findOne({ "_id": req.params._id }).lean()
        const foods = await Food.find().lean()
            // return res.send(foods)
        res.render('foodlist', { "foods": foods, layout: thelayout })
    } catch (err) {
        res.status(400)
        return res.send("Database query failed")
    }
}

// find one food by their id which is before login
const getOneFoodBefore = async(req, res) => {
        try {
            // console.log(req.params.foodId)
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
    //find one food by their id after the customer login
const getOneFood = async(req, res) => {
    try {
        if (req.session.email == null) {
            thelayout = 'beforeLogin.hbs'
        } else { thelayout = 'main.hbs' }
        //const customer = await Customer.findOne({ "_id": req.params._id }).lean()
        const oneFood = await Food.findOne({ "foodId": req.params.foodId }).lean()
        if (oneFood === null) { // no food found in database
            res.status(404)
            return res.send("Food not found.")
        }
        res.render('showFood', { "thisfood": oneFood, layout: thelayout })
    } catch (err) { // error occurred
        res.status(400)
        return res.send("Database query failed")
    }
}

//add food to customer cart
const addFood = async(req, res) => {

    const thisCustomer = await Customer.findOne({ email: req.session.email })

    let addFood = await Food.findOne({ foodId: req.params.foodId })

    // add food to customer's order list
    orderRecord = new Cart({ foodId: addFood._id })
    thisCustomer.cart.push(orderRecord)

    await thisCustomer.save()
        // show the new customer record
    result = await Customer.findOne({ "email": req.session.email }).populate('cart.foodId', 'name')
    res.render("addToCart", { "thisfood": addFood.toJSON(), "thiscustomer": thisCustomer.toJSON() })
}


const selectQuantity = async(req, res) => {

    const thisCustomer = await Customer.findOne({ email: req.session.email })

    let addFood = await Food.findOne({ foodId: req.params.foodId })
    

    
    // // add food to customer's order list
    // orderRecord = new Cart({ foodId: addFood._id })
    // thisCustomer.cart.push(orderRecord)

    // await thisCustomer.save()
    //     // show the new customer record
    // result = await Customer.findOne({ "email": req.session.email }).populate('cart.foodId', 'name')
    res.render("selectQuantity", { "thisfood": addFood.toJSON(), "thiscustomer": thisCustomer.toJSON() })
}

//add food to customer cart
const addFoodQuantity = async(req, res) => {
    
    // find the customer
    const thisCustomer = await Customer.findOne({ email: req.session.email })
    var shopping_cart = thisCustomer.cart
    // find the foodId
    let addFood = await Food.findOne({ foodId: req.params.foodId })
    // if there are food in shopping cart
    if(shopping_cart.length){
        var flag = 1
        // if the food is already exist in the shopping cart, we add up the quantity
        for (var i = 0; i < shopping_cart.length; i++) {
            // compare object id using equals
            if(shopping_cart[i].foodId.equals(addFood._id)){
                shopping_cart[i].quantity += Number(req.body.quantity)
                flag = 0;
            }
        }
        // cannot find the food
        if(flag){
            console.log("cannot find the food here")
            orderRecord = new Cart({ foodId: addFood._id, quantity: req.body.quantity})
            thisCustomer.cart.push(orderRecord)     
        }
    }else{ // first time insertion
        orderRecord = new Cart({ foodId: addFood._id, quantity: req.body.quantity})
        thisCustomer.cart.push(orderRecord)
    }

    console.log(thisCustomer)
    //找customer的shopping cart然后存数量就好了
    await thisCustomer.save()
    return res.render("addToCart", { "thisfood": addFood.toJSON(), "quantity": req.body.quantity})

    // const thisCustomer = await Customer.findOne({ email: req.session.email })

    // let addFood = await Food.findOne({ foodId: req.params.foodId })

    // // add food to customer's order list
    // orderRecord = new Cart({ foodId: addFood._id })
    // thisCustomer.cart.push(orderRecord)

    // await thisCustomer.save()
    //     // show the new customer record
    // result = await Customer.findOne({ "email": req.session.email }).populate('cart.foodId', 'name')
    // res.render("addToCart", { "thisfood": addFood.toJSON(), "thiscustomer": thisCustomer.toJSON() })
}



// remember to export the functions
module.exports = {
    //getAllFoodsBefore,
    getAllFoods,
    getOneFoodBefore,
    getOneFood,
    addFood,
    addFoodQuantity,
    selectQuantity
}