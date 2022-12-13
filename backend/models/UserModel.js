const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String
    },
    teacher:{
        type: mongoose.Types.ObjectId,
        ref: 'Teacher'
    },
    student:{
        type: mongoose.Types.ObjectId,
        ref: 'Student'
    },
    role:{
        type: String,
        enums:['student', 'teacher']
    }
})

module.exports = mongoose.model('User', userSchema)