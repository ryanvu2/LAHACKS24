const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    questAns: {
        type: Map,
        of: Object
    },
    textAns: {
        type: Map,
        of: String
    },
    isDoctor: {
        type: Boolean,
    },
    doctorsPatients: {
        type: Array
    },
    dailyTextAns: {
        type: Map,
        of: Object
    },
    profilePic: {
        type: String
    }
}, {timestamps: true}) //tracks when it was made and edited

module.exports = mongoose.model('User',userSchema)