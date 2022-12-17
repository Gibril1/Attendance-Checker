const express = require('express')
const router = express.Router()

const { 
    getEnrolledStudents, 
    markAttendance 
} = require('../controllers/TeacherControllers')

const { protect } = require('../middleware/authMiddleware')

router.get('/get-students/:id', protect, getEnrolledStudents)
router.post('/mark/:id', protect, markAttendance)

module.exports = router