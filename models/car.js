const mongoose = require("mongoose")

const carSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    images:[{type: String,default: ''}],
    tags: {
        carType:{
            type: String
        },
        company:{
            type:String
        },
        deler:{
            type: String
        }
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true
    }
},{timestamps:true})

const Car = mongoose.model("carSchema",carSchema)

module.exports = Car