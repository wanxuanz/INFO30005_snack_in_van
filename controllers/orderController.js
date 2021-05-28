const mongoose = require("mongoose")
const Order = mongoose.model("newOrders")
const Food = require("../models/food")
    // const van = require("../models/van")
    // const Van = van.Van
const Van = mongoose.model("vans")
    // const Van = require("../models/van")

// find outstanding order
const viewOutstandingOrders = async(req, res) => {
    try {
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
        return res.render('vanOutstandingOrders', { "outstandingOrders": outstandingOrders, layout: 'vendor_main.hbs' })
    } catch (err) {
        return res.status(400).render('error', { errorCode: '400', layout: 'initial', message: 'Database query failed' })
    }
}

// find order history
const viewOrderHistory = async(req, res) => {
    try {
        const OrderHistory = await Order.find({ vanId: req.session.van_name, status: "Fulfilled" }).sort({ dateCompare: 'asc' }).lean()
        for (var i = 0; i < OrderHistory.length; i++) {
            var foodnames = []
            for (var j = 0; j < OrderHistory[i].items.length; j++) {
                var thisfood = await Food.findOne({ "_id": OrderHistory[i].items[j].foodId })
                var foodname_quantity = {
                    foodname: thisfood.name,
                    quantity: OrderHistory[i].items[j].quantity
                }
                foodnames.push(foodname_quantity)
            }
            OrderHistory[i]["foodnames"] = foodnames
        }
        return res.render('vanOrderHistory', { "OrderHistory": OrderHistory, layout: 'vendor_main.hbs' })
    } catch (err) {
        return res.status(400).render('error', { errorCode: '400', layout: 'initial', message: 'Database query failed' })
    }
}

// get all newOrders
const getAllnewOrders = async(req, res) => {
    try {
        let oneVanOrder = await Order.find({ vanId: req.params.vanId })
        return res.send(oneVanOrder)
    } catch (err) {
        return res.status(400).render('error', { errorCode: '400', layout: 'initial', message: 'Database query failed' })
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
        return res.status(400).render('error', { errorCode: '400', layout: 'initial', message: 'Database query failed' })
    }
}

// find outstanding order
const getOutstandingnewOrders = async(req, res) => {
    try {
        const newOrders = await Order.find({ vanId: req.params.vanId, status: "outstanding" }, {});
        return res.send(newOrders)
    } catch (err) {
        return res.status(400).render('error', { errorCode: '400', layout: 'initial', message: 'Database query failed' })
    }
}

const getRating = async(req, res) => {
    try {
        //const customer = await Customer.findOne({ "_id": req.params._id }).lean()
        const order = await Order.findOne({ "_id": req.params.orderId }).lean()
            // return res.send(foods)
        res.render('rating', { "thisorder": order })
    } catch (err) {
        return res.status(400).render('error', { errorCode: '400', layout: 'initial', message: 'Database query failed' })
    }
}

const finishRating = async(req, res) => {
    try {

        const order_previous = await Order.findOne({ "_id": req.params.orderId }).lean()
        await Order.updateOne({ "_id": req.params.orderId }, { rating: req.body.rating }).lean()
            // updated order
        const order = await Order.findOne({ "_id": req.params.orderId }).lean()
        const currentVanAllOrders = await Order.find({ vanId: order_previous.vanId }).lean()
        const currentVanUnRatedOrders = await Order.find({ vanId: order_previous.vanId, rating: '0' }).lean()

        const currentVan = await Van.findOne({ vanId: order_previous.vanId }).lean()
            // all ratings
        var current_rating = Number(order.rating);
        var length_diff = currentVanAllOrders.length - currentVanUnRatedOrders.length
            //calcuate average
        var average;
        if (length_diff === 1) {
            average = current_rating
        } else {
            average = (Number(currentVan.vanRate) * (length_diff - 1) + current_rating) / (length_diff)
        }
        await Van.updateOne({ "vanId": order_previous.vanId }, { vanRate: String(average) }).lean()
        return res.render('ratingsuccess', { "thisorder": order });
    } catch (err) {
        console.log(err)
        return res.status(400).render('error', { errorCode: '400', layout: 'initial', message: 'Database query failed' })
    }

}

const updateOrderStatus = async(req, res) => {
    try {
        const DISCOUNT_TIME = 900000
        var outstandingOrder = await Order.findOne({ vanId: req.session.van_name, "_id": req.params._id }).lean()
        var now = new Date()
        var order_time = new Date(outstandingOrder.dateUTC)
        var diff = now - order_time

        if (diff > DISCOUNT_TIME) { // discount apply
            var new_total = Number(outstandingOrder.total) * 0.8
            await Order.updateOne({ "_id": outstandingOrder._id }, { status: "Fulfilled", "notshowrating": false, total: new_total, discount: true }).lean()
        } else { // no discount
            await Order.updateOne({ "_id": outstandingOrder._id }, { status: "Fulfilled", "notshowrating": false, }).lean()
        }
        outstandingOrder = await Order.findOne({ vanId: req.session.van_name, "_id": req.params._id }).lean()

        return res.render("updateOrderStatus", { "outstandingOrder": outstandingOrder, layout: 'vendor_main.hbs' })
    } catch (error) {
        console.log(error)
        return res.status(400).render('error', { errorCode: '400', layout: 'initial', message: 'Database query failed' })
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