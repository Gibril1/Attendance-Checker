const mongoose = require('mongoose')

const studentClassSchema = new mongoose.Schema({
    course:{
        type: mongoose.Types.ObjectId,
        ref: 'Course'
    },
    student:{
        type: mongoose.Types.ObjectId,
        ref: 'Student'
    }
})

module.exports = mongoose.model('StudentClass', studentClassSchema)