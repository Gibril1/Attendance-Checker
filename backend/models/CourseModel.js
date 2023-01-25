const mongoose = require('mongoose')

const courseSchema = new mongoose.Schema({
    name:{
        type: String
    },
    courseCode:{
        type: String,
        unique: true,
        required: true
    },
    creditHours:{
        type: Number
    },
    teacher:{
        type: mongoose.Types.ObjectId,
        ref: 'Teacher'
    }
})

module.exports = mongoose.model('Course', courseSchema)