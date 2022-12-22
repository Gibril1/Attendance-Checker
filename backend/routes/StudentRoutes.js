const express = require('express')
const router = express.Router()

const { 
    getCourses, 
    joinCourse,
    getJoinedCourses,
    checkAttendanceCount,
    getAttendanceList
} = require('../controllers/StudentControllers')

const { protect } = require('../middleware/authMiddleware')

router.get('/', protect, getCourses)
router.get('/join/:id', protect, joinCourse)
router.get('/joined-courses/', protect, getJoinedCourses)
router.get('/check/:id', protect, checkAttendanceCount)
router.get('/attendance/:id', protect, getAttendanceList)

module.exports = router