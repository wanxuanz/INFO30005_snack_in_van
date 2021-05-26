const mongoose = require("mongoose")

// import van model
const Van = mongoose.model("vans")

const geocoder = require('../utils/geocoder')

// change an van status(POST)
const updateVanStatus = async(req, res) => {

    if (req.session.email == null) {
        thelayout = 'vender_main.hbs'
    } else { thelayout = 'vender_main.hbs' }

    let oneVan = await Van.findOne({ vanId: req.session.van_name }).lean()
    console.log(oneVan)
        // if the van is open, we change it to close
    if (oneVan.status === 'close') {
        await Van.updateOne({ vanId: req.session.van_name }, { status: "open"}).lean()
    } else {
        await Van.updateOne({ vanId: req.session.van_name }, { status: "close"}).lean()
    }
    return res.render('showVanStatus', { "oneVan": oneVan, layout: thelayout })
}

const updateLocation = async(req, res) => {
    try {
        //get the van whose van_name is stored in the session -- van is logged in
        if (req.session.van_name) {
            // const loc = await geocoder.geocode(req.body.van_location)
            // const location = {
            //     type: 'Point',
            //     coordinates: [loc[0].longitude, loc[0].latitude],
            //     formattedAdddress: loc[0].formattedAdddress
            // }

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
        res.status(400)
        console.log(err)
        return res.send("Cannot find your van name")
    }
}

// add one customer in the register
const createOneVanLogin = async(req, res) => {
    var postData = {
        vanId: req.body.van_name,
        password: req.body.van_password,
    };
    const van = new Van(postData) // construct a new customer object from body of POST
    console.log(van)
    await van.save()
}


const getOneVanLogin = async(req, res) => {
    // if (req.body.email===""){
    //     res.status(404)
    //     return res.render('loginNotSuccess', { layout: "beforeLogin" })
    // }
    const oneVan = await Van.findOne({ "vanId": req.body.van_name, "password": req.body.van_password })
    console.log(oneVan)
    if (oneVan === null) { // no author found in database
        res.status(404)
            // return res.render('loginNotSuccess', { layout: "beforeLogin" })
    }
    // return res.render('customer', { "thiscustomer": oneCustomer.toJSON() })
};

// get all vans
const getAllVans = async(req, res) => {
    try {
        const vans = await Van.find()
        return res.send(vans)
    } catch (err) {
        res.status(400)
        return res.send("Database query failed")
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
        return res.render('venderHome', { "oneVan": oneVan, layout: thelayout})
    } catch (err) { // error occurred
        res.status(400)
        return res.send("Database query failed")
    }
}

const getVanFoods = async(req, res) => {
    try {
        if (req.session.email == null) {
            thelayout = 'vender_main.hbs'
        } else { thelayout = 'vender_main.hbs' }
        const foods = await Food.find().lean()
            // return res.send(foods)
        res.render('vanfoodlist', { "foods": foods, layout: thelayout})
    } catch (err) {
        res.status(400)
        return res.send("Database query failed")
    }
}

// catch a POST request and change the current location of the van and send it location
const changeAndSendLocation = async(req, res) => {
    var message = req.body
    await Van.updateOne({ vanId: req.params.vanId }, { location: message.location })
    res.send('Van locatioin: ' + JSON.stringify(message.location) + ' has been updated and sent successfully')
}

// export the functionss
module.exports = {
    updateVanStatus,
    getAllVans,
    getOneVan,
    changeAndSendLocation,
    getOneVanLogin,
    createOneVanLogin,
    updateLocation,

    getOneVan,
    getVanFoods
}