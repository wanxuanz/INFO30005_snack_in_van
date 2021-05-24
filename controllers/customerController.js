
const Food = require("../models/food")
const customer = require("../models/customer")
const Customer = customer.Customer
const order = require("../models/order")
const Order = order.Order
// import customer model
// const mongoose = require("mongoose")
// const Customer = mongoose.model("Customer")
// const Order = mongoose.model("Orders")

// this function will find the shopping cart of a given customer id
const findCart = async(req, res) => {
    try {
        const customer = await Customer.findOne({ "email": req.session.email }).lean()
        const cart = customer.cart
        const cartFood = []
        var total_price = 0
            // find the detail of foods
        for (var i = 0; i < cart.length; i++) {
            var oneFood = await Food.findOne({ "_id": cart[i].foodId }).lean()
            oneFood["cartId"] = cart[i]._id
            oneFood["quantity"] = cart[i].quantity
            cartFood.push(oneFood)
            total_price = total_price + Number(oneFood.price) * cart[i].quantity;
        }
        if (customer === null) {
            res.status(404)
            return res.send('Food not found')
        }
        res.render('shoppingCart', { "thiscustomer": customer, "cartFood": cartFood, "total_price": total_price })
    } catch (err) {
        res.status(400)
        console.log(err)
        return res.send("Cannot find the shopping cart")
    }
}

// this function is used to remove one food from shopping cart
const removeOneFood = async(req, res) => {
    try {
        await Customer.updateOne({ "email": req.session.email }, { $pull: { cart: { "_id": req.body.item_id } } }).lean()

        const customer = await Customer.findOne({ "email": req.session.email }).lean()
        const cart = customer.cart // array
        const cartFood = []
        var total_price = 0
            // find the detail of foods
        for (var i = 0; i < cart.length; i++) {
            var oneFood = await Food.findOne({ "_id": cart[i].foodId }).lean()
            oneFood["cartId"] = cart[i]._id
            oneFood["quantity"] = cart[i].quantity
            cartFood.push(oneFood)
            total_price = total_price + Number(oneFood.price) * cart[i].quantity;
        }
        if (customer === null) {
            res.status(404)
            return res.send('Food not found')
        }
        res.render('shoppingCart', { "thiscustomer": customer, "cartFood": cartFood, "total_price": total_price })
    } catch (err) {
        res.status(400)
        return res.send("Cannot remove this food")
    }
}

//find the login customer
const getOneCustomer = async(req, res) => {
    if (req.body.email === "") {
        res.status(404)
        return res.render('loginNotSuccess', { layout: "beforeLogin" })
    }
    const oneCustomer = await Customer.findOne({ "email": req.body.email, "password": req.body.password })
    if (oneCustomer === null) { // no author found in database
        res.status(404)
        return res.render('loginNotSuccess', { layout: "beforeLogin" })
    }
    return res.render('customer', { "thiscustomer": oneCustomer.toJSON() })
};

// add one customer in the register
const addOneCustomer = async(req, res) => {
    // handle invalid input
    if (req.body.email === "" || req.body.password === "" || req.body.first_name === "" || req.body.last_name === "") {
        res.status(404)
        return res.render('registerfail', { layout: "beforeLogin" })
    }
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
        return res.render("Database query failed")
    }
}

// find all the order the current customer has ordered
const getAllCustomerOrders = async(req, res) => {
    try {
        const customer = await Customer.findOne({ "email": req.session.email }).lean()
        console.log(customer._id)
            //display the name of each order
        const Orders = await Order.find({ "customerId": customer._id }).lean()
        // if(!Orders){
        //     return res.render('orderlist')
        // }
        for (var i = 0; i < Orders.length; i++) {
            var foodnames = []
            for (var j = 0; j < Orders[i].items.length; j++) {
                var thisfood = await Food.findOne({ "_id": Orders[i].items[j].foodId })
                var foodname_quantity = {
                    foodname: thisfood.name,
                    quantity: Orders[i].items[j].quantity
                }
                console.log(Orders[i].items[j])
                // foodnames.push(thisfood.name)
                foodnames.push(foodname_quantity)
            }
            Orders[i]["foodnames"] = foodnames
        }
        return res.render('orderlist', { "thiscustomer": customer, "Orders": Orders })
    } catch (err) {
        res.status(400)
        console.log(err)
        return res.send("Database query failed")
    }
}

// place the shopping cart item into orders
const placeOrder = async(req, res) => {
    const customer = await Customer.findOne({ "email": req.session.email }).lean()
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + '-' + today.getHours() + ':' + today.getMinutes();
    // shopping cart of current customer
    const cart = customer.cart
    if (cart.length == 0) {
        return res.render('shoppingCart', { "thiscustomer": customer })
    }
    //calculate the total price of this order
    var total_p = 0
    for (var i = 0; i < cart.length; i++) {
        var oneFood = await Food.findOne({ "_id": cart[i].foodId }).lean()
        oneFood["quantity"] = cart[i].quantity
        total_p = total_p + Number(oneFood.price) * cart[i].quantity;
    }
    var postData = {
        vanId: '1',
        time: date,
        dateCompare: today,
        customerId: String(customer._id),
        items: customer.cart,
        total: total_p,
        status: "Outstanding"
    };

    var order = new Order(postData)
        // handle when nothing is in the shopping cart
    try {
        await Customer.updateOne({ "email": req.session.email }, { "cart": [] }).lean()
        await order.save()
        return res.render('orderSuccess.hbs', { "thiscustomer": customer })
    } catch (err) {
        res.status(400)
        return res.send("placing order fails")
    }
}


//export the functions
module.exports = {
    findCart,
    removeOneFood,
    getOneCustomer,
    addOneCustomer,
    getAllCustomerOrders,
    placeOrder
}