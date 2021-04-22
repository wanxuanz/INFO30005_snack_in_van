const mongoose = require("mongoose")

// import van model
const Van = mongoose.model("vans")

// change an van status(POST)
const updateVanStatus = async (req, res) => {
   
   let oneVan = await Van.findOne({vanId: req.params.vanId})
    // if the van is open, we change it to close
  if(oneVan.status === 'close'){
    await Van.updateOne( {vanId: req.params.vanId}, { status : "open"  })
  } else{
    await Van.updateOne( {vanId: req.params.vanId}, { status : "close"  })
  }
  result = await Van.findOne({ vanId: req.params.vanId })
  res.send(result)
}

// get one van
const getOneVan = async (req, res) => {
  try {
      const oneVan = await Van.findOne( {"vanId": req.params.vanId} )
      if (oneVan === null) {   // no order found in database
          res.status(404)
          return res.send("Van not found")
      }
      return res.send(oneVan)  // order was found
  } catch (err) {     // error occurred
      res.status(400)
      return res.send("Database query failed")
  }
}
// get all vans
const getAllVans = async (req, res) => {
  try {
    const vans = await Van.find()
    return res.send(vans)
  } catch (err) {
    res.status(400)
    return res.send("Database query failed")
  }
}

// export the functionss
module.exports = {
  updateVanStatus, getAllVans, getOneVan
}