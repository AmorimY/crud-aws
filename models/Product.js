const mongoose = require('mongoose')

const Product =  mongoose.model('Product',{
    name : String,
    price: {
        type:Number,
        min:[0.1, "O Preço nao pode ser 0"]
    },
    quantity: {
        type: Number,
        min: [1,"A quantidade minima é 1"]
    },
    
})

module.exports = Product