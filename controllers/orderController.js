const mongoose = require("mongoose")

// import order model
const Order = mongoose.model("orders")

// get all orders
const getAllOrders = async (req, res) => {
  try {
    let oneVanOrder = await Order.find({vanId: req.params.vanId})
    return res.send(oneVanOrder)
  } catch (err) {
    res.status(400)
    return res.send("Database query failed")
  }
}

// find one order by their id
const getOneOrder = async (req, res) => {
   try {
       const oneOrder = await Order.findOne( {vanId: req.params.vanId ,orderId: req.params.orderId} )
       if (oneOrder === null) {   // no order found in database
           res.status(404)
           return res.send("Order not found")
       }
       return res.send(oneOrder)  // order was found
   } catch (err) {     // error occurred
       res.status(400)
       return res.send("Database query failed")
   }
}

// find outstanding order
const getOutstandingOrders = async (req, res) => {
	try {
	  const orders = await Order.find({ vanId: req.params.vanId, status: "outstanding"}, {});
	  return res.send(orders)
	} catch (err) {
	  res.status(400)
	  return res.send("Database query failed")
	}
}

// change an order status
const updateOrderStatus = async (req, res) => {  

	await Order.updateOne( {vanId: req.params.vanId ,orderId: req.params.orderId}, {status: 'fulfilled'} )
  result = await Order.findOne({ orderId: req.params.orderId })
  res.send(result)
}

// export the functions
module.exports = {
   getAllOrders, getOutstandingOrders, updateOrderStatus, getOneOrder
}