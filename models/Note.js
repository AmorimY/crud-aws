const mongoose = require('mongoose')

const Note = mongoose.model('Note',{
    content:  String,
    modified:{type: Date, default: () => Date.now() - 3*60*60*1000},
})

module.exports = Notes