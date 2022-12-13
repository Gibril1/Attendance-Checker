const mongoose = require('mongoose')

const teacherSchema = new mongoose.Schema({
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
    avatar:{
        type: String
    },
    cloudinaryId:{
        type:  String
    }
})

module.exports = mongoose.model('Teacher', teacherSchema)