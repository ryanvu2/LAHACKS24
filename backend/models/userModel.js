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
        of: String
    },
    textAns: {
        type: Map,
        of: String
    }
}, {timestamps: true}) //tracks when it was made and edited

module.exports = mongoose.model('User',userSchema)