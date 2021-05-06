const mongoose = require("mongoose")
const { db } = require("../models/food")
const Food = require("../models/food")

// import customer model
const Customer = mongoose.model("Customer")
const Order = mongoose.model("newOrders")

const findCart = async(req, res) => {
    try {
        const customer = await Customer.findOne({ "_id": req.params._id }).lean()
        const cart = customer.cart
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
        res.render('shoppingCart', { "thiscustomer": customer, "cartFood": cartFood, "total_price": total_price })
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

        await Customer.updateOne({ "_id": req.params._id }, { $pull: { cart: { "_id": req.body.item_id } } }).lean()

        const customer = await Customer.findOne({ "_id": req.params._id }).lean()
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
        res.render('shoppingCart', { "thiscustomer": customer, "cartFood": cartFood, "total_price": total_price })
    } catch (err) {
        res.status(400)
        return res.send("Database query failed")
    }
}

const getOneCustomer = async(req, res) => {

    const oneCustomer = await Customer.findOne({ "email": req.body.email, "password": req.body.password })
        //console.log(Customer.findOne({ "email": req.body.email, "password": req.body.password }))
    if (oneCustomer === null) { // no author found in database
        res.status(404)
        return res.render('loginNotSuccess', { layout: "beforeLogin" })
    }

    return res.render('customer', { "thiscustomer": oneCustomer.toJSON() })
};


const addOneCustomer = async(req, res) => {
    var postData = {
        email: req.body.email,
        password: req.body.password,
        firstName: req.body.first_name,
        lastName: req.body.last_name
    };
    const customer = new Customer(postData) // construct a new customer object from body of POST
    try {
        await customer.save() // save new customer object to database
        return res.render('customer', { "thiscustomer": customer.toJSON() }) // return saved object to sender

    } catch (err) { // error detected
        res.status(400)
        return res.send("Database insert failed")
    }
}

const getAllCustomernewOrders = async(req, res) => {
    try {
        const customer = await Customer.findOne({ "_id": req.params._id }).lean()


        const newOrders = await Order.find({ "customerId": req.params._id }, {}).lean()

        return res.render('orderlist', { "thiscustomer": customer, "newOrders": newOrders })
    } catch (err) {
        res.status(400)
        return res.send("Database query failed")
    }
}

const placeOrder = async(req, res) => {
    const customer = await Customer.findOne({ "_id": req.params._id }).lean()
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + '-' + today.getHours() + ':' + today.getMinutes();

    const cart = customer.cart
    if (cart.length == 0) {
        return res.render('shoppingCart', { "thiscustomer": customer })
    }
    var total_p = 0
    for (var i = 0; i < cart.length; i++) {
        var oneFood = await Food.findOne({ "_id": cart[i].foodId }).lean()
        total_p = total_p + Number(oneFood.price);
    }

    var postData = {
        vanId: '1001',
        time: date,
        customerId: String(customer._id),
        items: customer.cart,
        total: total_p,
        status: "Outstanding"
    };

    var order = new Order(postData)
    try {
        await Customer.updateOne({ "_id": req.params._id }, { "cart": [] }).lean()
        await order.save()
        return res.render('orderSuccess.hbs', { "thiscustomer": customer })
    } catch (err) {
        res.status(400)
        return res.send("Database query failed")
    }


}


// remember to export the functions
module.exports = {
    findCart,
    removeOneFood,
    getOneCustomer,
    addOneCustomer,
    getAllCustomernewOrders,
    placeOrder
}