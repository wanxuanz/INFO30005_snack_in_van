const mongoose = require("mongoose")

// import van model
const Van = mongoose.model("vans")

const geocoder = require('../utils/geocoder')

// change an van status(POST)
const updateVanStatus = async(req, res) => {
    try {
        if (req.session.email == null) {
            thelayout = 'vender_main.hbs'
        } else { thelayout = 'vender_main.hbs' }

        let oneVan = await Van.findOne({ vanId: req.session.van_name }).lean()
        console.log(oneVan)
            // if the van is open, we change it to close
        if (oneVan.status === 'close') {
            await Van.updateOne({ vanId: req.session.van_name }, { status: "open" }).lean()
        } else {
            await Van.updateOne({ vanId: req.session.van_name }, { status: "close" }).lean()
        }
        return res.render('showVanStatus', { "oneVan": oneVan, layout: thelayout })
    } catch (error) {
        return res.status(400).render('error', { errorCode: '400', message: 'Database query failed' })
    }
}

const updateLocation = async(req, res) => {
    try {
        //get the van whose van_name is stored in the session -- van is logged in
        if (req.session.van_name) {
            const location = {
                type: 'Point',
                coordinates: [req.body.longitude, req.body.latitude]
            }
            await Van.updateOne({ vanId: req.session.van_name }, { address: req.body.van_location })
            await Van.updateOne({ vanId: req.session.van_name }, { location: location })
                // mark status as open
            await Van.updateOne({ vanId: req.session.van_name }, { status: "open" })
            return res.render('sendLocationSuccess', { layout: "vender_main" })
        } else {
            return res.send("login failed")
        }
    } catch (err) { // error occurred
        return res.status(400).render('error', { errorCode: '400', message: 'Database query failed' })
    }
}

// get all vans
const getAllVans = async(req, res) => {
    try {
        const vans = await Van.find()
        return res.send(vans)
    } catch (err) {
        return res.status(400).render('error', { errorCode: '400', message: 'Database query failed' })
    }
}

// get one van
const getOneVan = async(req, res) => {
    try {
        if (req.session.email == null) {
            thelayout = 'vender_main.hbs'
        } else { thelayout = 'vender_main.hbs' }
        const oneVan = await Van.findOne({ vanId: req.session.van_name }).lean()
        if (oneVan === null) { // no van found in database
            res.status(404)
            return res.send("Van not found")
        }
        return res.render('venderHome', { "oneVan": oneVan, layout: thelayout })
    } catch (err) { // error occurred
        return res.status(400).render('error', { errorCode: '400', message: 'Database query failed' })
    }
}

const getVanFoods = async(req, res) => {
    try {
        if (req.session.email == null) {
            thelayout = 'vender_main.hbs'
        } else { thelayout = 'vender_main.hbs' }
        const foods = await Food.find().lean()
            // return res.send(foods)
        res.render('vanfoodlist', { "foods": foods, layout: thelayout })
    } catch (err) {
        return res.status(400).render('error', { errorCode: '400', message: 'Database query failed' })
    }
}

// export the functionss
module.exports = {
    updateVanStatus,
    getAllVans,
    getOneVan,
    updateLocation,
    getOneVan,
    getVanFoods
}