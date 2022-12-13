const mongoose = require('mongoose')

const studentClassSchema = new mongoose.Schema({
    class:{
        type: mongoose.Types.ObjectId,
        ref: 'Class'
    },
    student:{
        type: mongoose.Types.ObjectId,
        ref: 'Student'
    }
})

module.exports = mongoose.model('StudentClass', studentClassSchema)