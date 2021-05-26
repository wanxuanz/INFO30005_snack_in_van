const mongoose = require("mongoose")
const Order = mongoose.model("newOrders")
const Food = require("../models/food")

// find outstanding order
const viewOutstandingOrders = async(req, res) => {
    try {
        if (req.session.email == null) {
            thelayout = 'vender_main.hbs'
        } else { thelayout = 'vender_main.hbs' }
        const outstandingOrders = await Order.find({ vanId: req.session.van_name, status: "Outstanding" }).sort({ dateCompare: 'asc' }).lean()
        for (var i = 0; i < outstandingOrders.length; i++) {
            var foodnames = []
            for (var j = 0; j < outstandingOrders[i].items.length; j++) {
                var thisfood = await Food.findOne({ "_id": outstandingOrders[i].items[j].foodId })
                var foodname_quantity = {
                    foodname: thisfood.name,
                    quantity: outstandingOrders[i].items[j].quantity
                }
                foodnames.push(foodname_quantity)
            }
            outstandingOrders[i]["foodnames"] = foodnames
        }
        return res.render('vanOutstandingOrders', { "outstandingOrders": outstandingOrders, layout: thelayout })
    } catch (err) {
        return res.status(400).render('error', { errorCode: '400', message: 'Database query failed' })
    }
}

// find order history
const viewOrderHistory = async(req, res) => {
    try {
        if (req.session.email == null) {
            thelayout = 'vender_main.hbs'
        } else { thelayout = 'vender_main.hbs' }
        const OrderHistory = await Order.find({ vanId: req.session.van_name, status: "Fulfilled" }).sort({ dateCompare: 'asc' }).lean()
        return res.render('vanOrderHistory', { "OrderHistory": OrderHistory, layout: thelayout })
    } catch (err) {
        return res.status(400).render('error', { errorCode: '400', message: 'Database query failed' })
    }
}

// get all newOrders
const getAllnewOrders = async(req, res) => {
    try {
        let oneVanOrder = await Order.find({ vanId: req.params.vanId })
        return res.send(oneVanOrder)
    } catch (err) {
        return res.status(400).render('error', { errorCode: '400', message: 'Database query failed' })
    }
}

// find one order by their id
const getOneOrder = async(req, res) => {
    try {
        const oneOrder = await Order.findOne({ vanId: req.params.vanId, orderId: req.params.orderId })
        if (oneOrder === null) { // no order found in database
            res.status(404)
            return res.send("Order not found")
        }
        return res.send(oneOrder) // order was found
    } catch (err) { // error occurred
        return res.status(400).render('error', { errorCode: '400', message: 'Database query failed' })
    }
}

// find outstanding order
const getOutstandingnewOrders = async(req, res) => {
    try {
        const newOrders = await Order.find({ vanId: req.params.vanId, status: "outstanding" }, {});
        return res.send(newOrders)
    } catch (err) {
        return res.status(400).render('error', { errorCode: '400', message: 'Database query failed' })
    }
}

const getRating = async(req, res) => {
    try {
        //const customer = await Customer.findOne({ "_id": req.params._id }).lean()
        const order = await Order.findOne({ "_id": req.params.orderId }).lean()
            // return res.send(foods)
        res.render('rating', { "thisorder": order })
    } catch (err) {
        return res.status(400).render('error', { errorCode: '400', message: 'Database query failed' })
    }
}

const finishRating = async(req, res) => {
    try {
        //const customer = await Customer.findOne({ "_id": req.params._id }).lean()
        await Order.updateOne({ "_id": req.params.orderId }, { rating: req.body.rating }).lean()
        const order = await Order.findOne({ "_id": req.params.orderId }).lean()
        return res.render('ratingsuccess', { "thisorder": order });
    } catch (err) {
        return res.status(400).render('error', { errorCode: '400', message: 'Database query failed' })
    }

}

const updateOrderStatus = async(req, res) => {
    try {
        if (req.session.email == null) {
            thelayout = 'vender_main.hbs'
        } else { thelayout = 'vender_main.hbs' }

        const outstandingOrder = await Order.findOne({ vanId: req.session.van_name, "_id": req.params._id }).lean()
        await Order.updateOne({ "_id": outstandingOrder._id }, { status: "Fulfilled", "notshowrating": false }).lean()
        console.log(outstandingOrder._id)

        return res.render("updateOrderStatus", { "outstandingOrder": outstandingOrder })
    } catch (error) {
        return res.status(400).render('error', { errorCode: '400', message: 'Database query failed' })
    }

}

// export the functions
module.exports = {
    getAllnewOrders,
    getOutstandingnewOrders,
    getOneOrder,
    finishRating,
    getRating,
    viewOutstandingOrders,
    viewOrderHistory,
    updateOrderStatus
}