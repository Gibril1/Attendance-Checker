const mongoose = require('mongoose')

const studentSchema = new mongoose.Schema({
    firstName:{
        type: String
    },
    lastName:{
        type: String
    },
    otherName:{
        type: String
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String
    },
    referenceNumber:{
        type: String,
        unique: true
    }, 
    avatar:{
        type: String
    },
    cloudinaryId:{
        type:  String
    }
})

module.exports = mongoose.model('Student', studentSchema)