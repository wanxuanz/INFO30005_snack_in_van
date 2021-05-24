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

// export the functions
module.exports = {
    getAllnewOrders,
    getOutstandingnewOrders,
    updatenewOrderstatus,
    getOneOrder,


    viewAllOrders
}