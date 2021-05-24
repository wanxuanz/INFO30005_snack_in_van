const mongoose = require("mongoose")

// import order model
const Order = mongoose.model("Orders")



//view all orders
//  In time order. with the older, more urgent orders at the top asc or desc
const viewAllOrders = async(req, res) => {
    try {
        const oneVanOrder = await Order.find({ vanId: req.session.van_name }).sort({ dateCompare: 'asc' }).lean()
        //var item = [];
        // for (var i = 0; i < oneVanOrder.length; i++) {
        //     item.push(oneVanOrder[i].items)
        // }
        return res.render('vanOrders', { "oneVanOrder": oneVanOrder})
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
        return res.render('vanOutstandingOrders', { "outstandingOrders": outstandingOrders, layout: thelayout})
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
        return res.render('vanOrderHistory', { "OrderHistory": OrderHistory, layout: thelayout})
    } catch (err) {
        res.status(400)
        return res.send("Database query failed")
    }
}


/**********************************************************************************************************/



// get all Orders
const getAllOrders = async(req, res) => {
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
const getOutstandingOrders = async(req, res) => {
    try {
        const Orders = await Order.find({ vanId: req.params.vanId, status: "outstanding" }, {});
        return res.send(Orders)
    } catch (err) {
        res.status(400)
        return res.send("Database query failed")
    }
}

// change an order status
const updateOrderstatus = async(req, res) => {
    await Order.updateOne({ vanId: req.params.vanId, orderId: req.params.orderId }, { status: 'fulfilled' })
    result = await Order.findOne({ orderId: req.params.orderId })
    res.send(result)
}

// mark order as completed
// const orderComplete = async(req, res) => {
//     try {
//         const van = await Van.findOne({ "vanId": req.session.vanId}).lean()
        
//         console.log(van._id)
        
//         order = van.order
//         for(var i=0; i<order.length; i++) {
//             var vanorder = await Order.findOne({"orderId": order[i].orderId}).lean()
//             if (vanorder.status === 'Outstanding') {
//                 await Order.updateOne({ "orderId": order[i].orderId }, { status: "Fulfilled" })
//                 return res.render('vanOutstandingOrders', { "vanorder": vanorder })
//             } 
//         }
        
//     } catch (err) {
//         res.status(400)
//         console.log(err)
//         return res.send("cannot complete the order")
//     }
// }

const updateOrderStatus = async(req, res) => {
        if (req.session.email == null) {
            thelayout = 'vender_main.hbs'
        } else { thelayout = 'vender_main.hbs' }
        
        const outstandingOrders = await Order.find({ vanId: req.session.van_name }).lean()
        for(var i=0; i<outstandingOrders.length; i++) {
            console.log(i)
            await Order.updateOne({ _id: outstandingOrders[i]._id }, { status: "Fulfilled" }).lean()
            return res.render('updateOrderStatus', {layout: thelayout})
        }
}

// export the functions
module.exports = {
    getAllOrders,
    getOutstandingOrders,
    updateOrderstatus,
    getOneOrder,


    viewAllOrders,
    viewOutstandingOrders,
    viewOrderHistory,
    updateOrderStatus
}