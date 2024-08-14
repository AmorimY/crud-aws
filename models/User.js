const mongoose = require('mongoose')

const User =  mongoose.model('User',{
    name : String,
    email : String,
    password: String,
    created:{type: Date, default: () => Date.now() - 3*60*60*1000},
})

module.exports = User