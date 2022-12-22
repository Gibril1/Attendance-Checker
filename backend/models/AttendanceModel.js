const mongoose = require('mongoose')

const attendanceSchema = new mongoose.Schema({
    teacher:{
        type: mongoose.Types.ObjectId,
        ref: 'Teacher'
    },
    student:{
        type: mongoose.Types.ObjectId,
        ref: 'Users'
    },
    course:{
        type: mongoose.Types.ObjectId,
        ref: 'Course'
    },
    date:{
        type: Date,
        default: Date.now()
    },
    status:{
        type: String,
        enums: ['Present', 'Absent']
    }

})

module.exports = mongoose.model('Attendance', attendanceSchema)