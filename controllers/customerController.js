const Food = require("../models/food")
const customer = require("../models/customer")
const Customer = customer.Customer
const order = require("../models/order")
const Order = order.Order
const van = require("../models/van")
const Van = van.Van

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
                // oneFood["cartId"] = cart[i]._id
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
        // await Customer.updateOne({ "email": req.session.email }, { $pull: { cart: { "_id": req.body.item_id } } }).lean()
        await Customer.updateOne({ "email": req.session.email }, { $pull: { cart: { "foodId": req.body.item_id } } }).lean()
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
const editQuantity = async(req, res) => {
    try {
        // if the quantity is 0, remove the food
        if (req.body.quantity == 0) {
            await Customer.updateOne({ "email": req.session.email }, { $pull: { cart: { "foodId": req.body.item_id } } }).lean()
        } else { // update the quantity
            await Food.updateOne({ name: 'Beer' }, { description: 'changed the beer' })
                // await Order.updateOne({"_id": req.body.orderId}, {"$set": { "visibility": false }});
            await Customer.updateOne({ "email": req.session.email, "cart.foodId": req.body.item_id }, {
                $set: {
                    "cart.$.quantity": req.body.quantity
                }
            })
        }
        // await Customer.updateOne({ "email": req.session.email }, { $pull: { cart: { "foodId": req.body.item_id } } }).lean()
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
const changeInfo = async(req, res) => {
    // handle invalid input
    if (req.body.password2 === "" || req.body.password === "" || req.body.first_name === "" || req.body.last_name === "") {
        res.status(404)
        return res.render('changeinfofail', { "message": "blank input, type again please" })
    }
    if (!req.body.password2 === req.body.password) {
        res.status(404)
        return res.render('changeinfofail', { "message": "Please input the same passowrd twice." })
    }
    // let pass=Customer.generateHash(req.body.password)
    // await Customer.updateOne({ "email": req.session.email }, { "password": pass,"lastName": req.body.last_name, "firstName":req.body.first_name}).lean()

    // oneCustomer.password = pass;
    // oneCustomer.lastName = req.body.last_name;
    // oneCustomer.firstName = req.body.first_name; // construct a new customer object from body of POST
    try {
        var oneCustomer = new Customer();
        var passw = oneCustomer.generateHash(req.body.password)
        await Customer.findOneAndUpdate({ "email": req.session.email }, { "password": passw, "lastName": req.body.last_name, "firstName": req.body.first_name }).lean()
        var oneCustomer = await Customer.findOne({ "email": req.session.email })
        return res.render('successchange', { "thiscustomer": oneCustomer.toJSON() }) // return saved object to sender

    } catch (err) { // error detected
        res.status(400)
        return res.render("Database query failed")
    }
}


const changeInfo1 = async(req, res) => {

        var oneCustomer = await Customer.findOne({ "email": req.session.email })
        return res.render('changeinfo', { "thiscustomer": oneCustomer.toJSON() }) // return saved object to sender

    }
    // find all the order the current customer has ordered
const getAllCustomernewOrders = async(req, res) => {
    try {
        const customer = await Customer.findOne({ "email": req.session.email }).lean()
            //display the name of each order from newest to oldest
        const newOrders = await Order.find({ "customerId": customer._id }).sort({ dateCompare: 'desc' }).lean()
        for (var i = 0; i < newOrders.length; i++) {
            var foodnames = []
            for (var j = 0; j < newOrders[i].items.length; j++) {
                var thisfood = await Food.findOne({ "_id": newOrders[i].items[j].foodId })
                var foodname_quantity = {
                        foodname: thisfood.name,
                        quantity: newOrders[i].items[j].quantity
                    }
                    // console.log(newOrders[i].items[j])
                    // foodnames.push(thisfood.name)
                foodnames.push(foodname_quantity)
            }
            newOrders[i]["foodnames"] = foodnames
        }
        return res.render('orderlist', { "thiscustomer": customer, "newOrders": newOrders })
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
    var year_month_day = today.toISOString().split('T')[0];
    var time = today.toISOString().split('T')[1].split('.')[0]
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
        vanId: req.session.vanId,
        time: date,
        dateCompare: today,
        dateUTC: year_month_day + 'T' + time + 'Z',
        customerId: String(customer._id),
        items: customer.cart,
        total: total_p,
        status: "Outstanding",
        rating: 5
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

const getVans = async(req, res, next) => {
    try {
        const vans = await Van.find();
        console.log(vans)
        return res.status(200).json({
            success: true,
            count: vans.length,
            data: vans
        })
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: 'Server error' })
    }
}

const chooseVan = async(req, res) => {
    try {
        //const customer = await Customer.findOne({ "email": req.session.email }).lean()

        // await Customer.updateOne({ "email": req.session.email }, { vanId: req.body.van_id })
        req.session.vanId = req.body.van_id
            // console.log(req.session.vanId)
        return res.render('selectVanSuccess', { "vanId": req.session.vanId })
    } catch (err) {

    }
}

// handle cancel one order but not delete it from the database
const cancelOrder = async(req, res) => {
    try {
        const customer = await Customer.findOne({ "email": req.session.email }).lean()
        console.log(customer._id)

        //set the visibility to false
        await Order.updateOne({ "_id": req.body.orderId }, { "$set": { "visibility": false } });

        // display from newest to olderest
        const newOrders = await Order.find({ "customerId": customer._id }).sort({ dateCompare: 'desc' }).lean()
        for (var i = 0; i < newOrders.length; i++) {
            var foodnames = []
            for (var j = 0; j < newOrders[i].items.length; j++) {
                var thisfood = await Food.findOne({ "_id": newOrders[i].items[j].foodId })
                var foodname_quantity = {
                        foodname: thisfood.name,
                        quantity: newOrders[i].items[j].quantity
                    }
                    // console.log(newOrders[i].items[j])
                    // foodnames.push(thisfood.name)
                foodnames.push(foodname_quantity)
            }
            newOrders[i]["foodnames"] = foodnames
        }
        console.log(newOrders)
        return res.render('orderlist', { "thiscustomer": customer, "newOrders": newOrders })
    } catch (err) {
        res.status(400)
        console.log(err)
        return res.send("cannot cancel the order")
    }
}

const changeOrder = async(req, res) => {
    try {
        const customer = await Customer.findOne({ "email": req.session.email }).lean()
            // var oneFood = await Food.findOne({ "_id": cart[i].foodId }).lean()
        const order = await Order.findOne({ "_id": req.body.orderId }).lean()
        const items = order.items
        console.log(items)
        var newItems = []
        var cartFood = []
        total_price = 0;
        for (var i = 0; i < items.length; i++) {
            var oneFood = await Food.findOne({ "_id": items[i].foodId }).lean()
            var oneItem = {
                foodId: items[i].foodId,
                quantity: items[i].quantity
            }
            oneFood["quantity"] = items[i].quantity
            total_price += Number(oneFood.price) * items[i].quantity
            cartFood.push(oneFood)
            newItems.push(oneItem)
        }
        // console.log(newItems)
        await Customer.updateOne({ "email": req.session.email }, { "$set": { "cart": newItems } }).lean();
        const newCustomer = await Customer.findOne({ "email": req.session.email }).lean()
            // console.log(newCustomer)
            //set the visibility to false
        await Order.updateOne({ "_id": req.body.orderId }, { "$set": { "visibility": false } });
        //put back this order to the shopping cart of this customer
        return res.render('shoppingCart', { "thiscustomer": newCustomer, "cartFood": cartFood, "total_price": total_price })

    } catch (err) {
        res.status(400)
        console.log(err)
        return res.send("cannot cancel the order")
    }
}

const getInfo = async(req, res) => {

    const oneCustomer = await Customer.findOne({ "email": req.session.email })
    if (oneCustomer === null) { // no author found in database
        res.status(404)
        return res.render('loginNotSuccess', { layout: "beforeLogin" })
    }
    return res.render('customerinfo', { "thiscustomer": oneCustomer.toJSON() })
};


//export the functions
module.exports = {
    findCart,
    removeOneFood,
    getOneCustomer,
    changeInfo,
    getAllCustomernewOrders,
    placeOrder,
    getVans,
    chooseVan,
    cancelOrder,
    changeOrder,
    editQuantity,
    changeInfo1,
    getInfo
}