const mongoose = require("mongoose")

const vanSchema = new mongoose.Schema({
  vanId: String,
  location: String,
  status: String
})

const Van = mongoose.model("vans", vanSchema)

module.exports = Van
