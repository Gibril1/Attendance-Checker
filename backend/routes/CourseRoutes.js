const express = require('express')
const router = express.Router()

const { 
    createCourse, 
    updateCourse, 
    getCourse, 
    deleteCourse 
} = require('../controllers/CourseControllers')

const { protect } = require('../middleware/authMiddleware')

router.route('/').get(protect, getCourse).post(protect, createCourse)
router.route('/:id').delete(protect, deleteCourse).put(protect, updateCourse)

module.exports = router