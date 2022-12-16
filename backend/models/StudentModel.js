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
    
    referenceNumber:{
        type: String,
        unique: true
    }, 
    userId:{
        type: mongoose.Types.ObjectId,
        ref:'User'
    },
    avatar:{
        type: String
    },
    cloudinaryId:{
        type:  String
    }
})

module.exports = mongoose.model('Student', studentSchema)