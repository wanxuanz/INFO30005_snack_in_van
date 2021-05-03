const mongoose = require("mongoose")
const { db } = require("../models/food")
const Food = require("../models/food")
    // import customer model
const Customer = mongoose.model("Customer")

const getAllCustomers = async(req, res) => {
    try {
        const customers = await Customer.find({}, { firstName: true, customerId: true }).populate('cart.foodId', 'name')
        return res.send(customers)
    } catch (err) {
        res.status(400)
        return res.send("Database query failed")
    }
}

// catch a POST request and we can add more customer in our database
const addCustomer = async(req, res) => {
    const customer = new Customer(req.body) // construct a new customer object from body of POST
    try {
        let result = await customer.save() // save new customer object to database
        return res.send(result) // return saved object to sender
    } catch (err) { // error detected
        res.status(400)
        return res.send("Database insert failed")
    }
}

const findCart = async(req, res) => {
    try {
        const customer = await Customer.findOne({ "customerId": '1001' }).lean()
        const cart = customer.cart // array
        const cartFood = []
        var total_price = 0
        for (var i = 0; i < cart.length; i++) {
            // console.log(cart[i].foodId)
            var oneFood = await Food.findOne({ "_id": cart[i].foodId }).lean()
            oneFood["cartId"] = cart[i]._id
                //console.log(oneFood["cartId"])
            cartFood.push(oneFood)

            total_price = total_price + Number(oneFood.price);
        }
        if (customer === null) {
            res.status(404)
            return res.send('Food not found')
        }
        res.render('shoppingCart', { "customer": customer, "cartFood": cartFood, "total_price": total_price })
            // res.render('shoppingCart',{"cartFood": cartFood})
    } catch (err) {
        res.status(400)
        return res.send("Database query failed")
    }
}

const removeOneFood = async(req, res) => {
    try {
        //var oneFood = await Customer.findOne({ "customerId": '1001' }, { cart: { $elemMatch: { "_id": req.body.item_id } } }).lean()
        console.log(req.body.item_id)

        await Customer.updateOne({ "customerId": "1001" }, { $pull: { cart: { "_id": req.body.item_id } } }).lean()

        const customer = await Customer.findOne({ "customerId": '1001' }).lean()
        const cart = customer.cart // array
        const cartFood = []
        var total_price = 0
        for (var i = 0; i < cart.length; i++) {
            // console.log(cart[i].foodId)
            var oneFood = await Food.findOne({ "_id": cart[i].foodId }).lean()
            oneFood["cartId"] = cart[i]._id
            cartFood.push(oneFood)

            total_price = total_price + Number(oneFood.price);
        }
        if (customer === null) {
            res.status(404)
            return res.send('Food not found')
        }
        res.render('shoppingCart', { "customer": customer, "cartFood": cartFood, "total_price": total_price })
    } catch (err) {
        res.status(400)
        return res.send("Database query failed")
    }
}

// remember to export the functions
module.exports = {
    getAllCustomers,
    addCustomer,
    findCart,
    removeOneFood
}