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
    currJournal: {
        type: Number
    },
    journalHistory: {
        type: Array
    },
    usersDoctors: {
        type: Array
    }
}, {timestamps: true}) //tracks when it was made and edited

module.exports = mongoose.model('User',userSchema)