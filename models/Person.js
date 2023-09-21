const mongoose = require('mongoose')

const Person =  mongoose.model('Person',{
    name : String,
    salary: Number,
    approved: Boolean,
    modified:{type: Date, default: () => Date.now() - 3*60*60*1000},
})

module.exports = Person