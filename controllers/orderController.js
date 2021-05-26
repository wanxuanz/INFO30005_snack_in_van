const mongoose = require("mongoose")

// import order model
const Order = mongoose.model("newOrders")



//view all orders
//  In time order. with the older, more urgent orders at the top asc or desc
const viewAllOrders = async(req, res) => {
    try {
        let oneVanOrder = await Order.find({ vanId: req.session.van_name }).sort({ dateCompare: 'asc' }).lean()
            // console.log(oneVanOrder)
        var item = [];
        for (var i = 0; i < oneVanOrder.length; i++) {
            item.push(oneVanOrder[i].items)
        }
        // console.log(item)
        return res.send(oneVanOrder)
    } catch (err) {
        res.status(400)
        return res.send("Database query failed")
    }
}

// find outstanding order
const viewOutstandingOrders = async(req, res) => {
    try {
        if (req.session.email == null) {
            thelayout = 'vender_main.hbs'
        } else { thelayout = 'vender_main.hbs' }
        const outstandingOrders = await Order.find({ vanId: req.session.van_name, status: "Outstanding" }).sort({ dateCompare: 'asc' }).lean()
        return res.render('vanOutstandingOrders', { "outstandingOrders": outstandingOrders, layout: thelayout })
    } catch (err) {
        res.status(400)
        return res.send("Database query failed")
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
        res.status(400)
        return res.send("Database query failed")
    }
}




/**********************************************************************************************************/



// get all newOrders
const getAllnewOrders = async(req, res) => {
    try {
        let oneVanOrder = await Order.find({ vanId: req.params.vanId })
        return res.send(oneVanOrder)
    } catch (err) {
        res.status(400)
        return res.send("Database query failed")
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
        res.status(400)
        return res.send("Database query failed")
    }
}

// find outstanding order
const getOutstandingnewOrders = async(req, res) => {
    try {
        const newOrders = await Order.find({ vanId: req.params.vanId, status: "outstanding" }, {});
        return res.send(newOrders)
    } catch (err) {
        res.status(400)
        return res.send("Database query failed")
    }
}

// change an order status
const updatenewOrderstatus = async(req, res) => {

    await Order.updateOne({ vanId: req.params.vanId, orderId: req.params.orderId }, { status: 'fulfilled' })
    result = await Order.findOne({ orderId: req.params.orderId })
    res.send(result)
}

const getRating = async(req, res) => {

    try {
        //const customer = await Customer.findOne({ "_id": req.params._id }).lean()
        const order = await Order.findOne({ "_id": req.params.orderId }).lean()
            // return res.send(foods)
        res.render('rating', { "thisorder": order })
    } catch (err) {
        res.status(400)
        return res.send("Database query failed")
    }

}

const finishRating = async(req, res) => {
    try {
        //const customer = await Customer.findOne({ "_id": req.params._id }).lean()
        await Order.updateOne({ "_id": req.params.orderId }, { rating: req.body.rating }).lean()
        const order = await Order.findOne({ "_id": req.params.orderId }).lean()
        return res.render('ratingsuccess', { "thisorder": order });
    } catch (err) {
        res.status(400)
        return res.send("Database query failed")
    }

}

// return saved object to sender


const updateOrderStatus = async(req, res) => {
    if (req.session.email == null) {
        thelayout = 'vender_main.hbs'
    } else { thelayout = 'vender_main.hbs' }

    const outstandingOrder = await Order.findOne({ vanId: req.session.van_name, "_id": req.params._id }).lean()
    await Order.updateOne({ "_id": outstandingOrder._id }, { status: "Fulfilled" }).lean()
    console.log(outstandingOrder._id)

    return res.render("updateOrderStatus", { "outstandingOrder": outstandingOrder })
        // const outstandingOrders = await Order.find({ vanId: req.session.van_name }).lean()
        // for(var i=0; i<outstandingOrders.length; i++) {
        //     console.log(i)
        //     await Order.updateOne({ _id: outstandingOrders[i]._id }, { status: "Fulfilled" }).lean()
        //     return res.render('updateOrderStatus', {layout: thelayout})
        // }
}


// export the functions
module.exports = {
    getAllnewOrders,
    getOutstandingnewOrders,
    updatenewOrderstatus,
    getOneOrder,
    finishRating,
    getRating,

    viewAllOrders,
    viewOutstandingOrders,
    viewOrderHistory,
    updateOrderStatus
}