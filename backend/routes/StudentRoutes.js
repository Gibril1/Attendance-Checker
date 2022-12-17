const express = require('express')
const router = express.Router()

const { 
    getCourses, 
    joinCourse,
    getJoinedCourses
} = require('../controllers/StudentControllers')

const { protect } = require('../middleware/authMiddleware')

router.get('/', protect, getCourses)
router.get('/join/:id', protect, joinCourse)
router.get('/joined-courses/', protect, getJoinedCourses)

module.exports = router