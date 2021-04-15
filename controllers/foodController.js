const mongoose = require("mongoose")
// import food model
const Food = mongoose.model("Food")
// get all foods
const getAllFoods = async (req, res) => {
  try {
    const foods = await Food.find({},{name: true, foodId: true, _id: false,description: true, price: true})
    return res.send(foods)
  } catch (err) {
    res.status(400)
    return res.send("Database query failed")
  } 
}

// find one food by their id
const getOneFood = async (req, res) => {
try {
	console.log(req.params.foodId)
const oneFood = await Food.findOne( {"foodId": req.params.foodId})
        if (oneFood === null) {   // no food found in database
            res.status(404)
            return res.send("Food not found.")
        }
        return res.send(oneFood)  // food was found
    } catch (err) {     // error occurred
        res.status(400)
        return res.send("Database query failed")
    }
}

// remember to export the functions
module.exports = {
  getAllFoods,
  getOneFood
}