const mongoose = require('mongoose')
//the format of an exercise submission in the api
const exerciseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        default: "Exercise enjoyer"
    },
    exercise: {
        type: String,
        required: true,
        default: "20 minutes treadmill"
    }
})

module.exports = mongoose.model('Exercise', exerciseSchema)