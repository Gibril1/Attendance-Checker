const mongoose = require('mongoose')

const classSchema = new mongoose.Schema({
    name:{
        type: String
    },
    courseCode:{
        type: String
    },
    creditHours:{
        type: Number
    },
    teacher:{
        type: mongoose.Types.ObjectId,
        ref: 'Teacher'
    }
})

module.exports = mongoose.model('Class', classSchema)