const mongoose = require('mongoose')

const purebredSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    breed:{
        type: String,
        required: true
    },
    images: [{
        type: String,
        required: true
    }],
    age: {
        type: Number,
        required: true
    },
    height:{
        type: Number,
        required: true,
    },
    weight:{
        type: Number,
        required: true
    },
    kennel:{
        type: mongoose.Schema.ObjectId,
        ref: "Kennel", 
        required: true,
    },
    litter: {
        type: Number,
        required: true
    }, 
    gender:{
        type: String,
        required: true
    },
    price: Number,
    desc: String,
    puppyImages: [String]
})

const Purebred = mongoose.model("Purebred", purebredSchema)
module.exports = Purebred