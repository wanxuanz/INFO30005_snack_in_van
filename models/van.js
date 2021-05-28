const mongoose = require("mongoose")

const bcrypt = require('bcrypt-nodejs')

const vanSchema = new mongoose.Schema({
    vanId: {
        type: String
            // required: true
    },
    address: {
        type: String,
        // required: true
    },
    location: {
        type: {
            type: String,
            enum: ['Point'] // 'location.type' must be 'Point'
        },
        coordinates: {
            type: [Number],
            index: '2dsphere'
        }
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    // status: {type: String, default: "close"},
    status: { type: String, default: "close" },
    password: { type: String, require: true },
    vanRate:{ type: String, default: "0" }
})

// method for generating a hash; used for password hashing
vanSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
};

// checks if password is valid
vanSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

const Van = mongoose.model("vans", vanSchema)

module.exports = {
    Van
}