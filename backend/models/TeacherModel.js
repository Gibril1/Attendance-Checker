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

module.exports = mongoose.model('Teacher', teacherSchema)



    