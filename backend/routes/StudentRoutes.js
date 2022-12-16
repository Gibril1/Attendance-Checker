const express = require('express')
const router = express.Router()

const { 
    getCourses, 
    joinCourse 
} = require('../controllers/StudentControllers')

const { protect } = require('../middleware/authMiddleware')

router.get('/', protect, getCourses)
router.get('/join/:id', protect, joinCourse)

module.exports = router