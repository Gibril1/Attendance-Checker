const express = require('express')
const router = express.Router()

const { 
    createCourse, 
    updateCourse, 
    getCourse, 
    getCourses,
    deleteCourse 
} = require('../controllers/CourseControllers')

const { protect } = require('../middleware/authMiddleware')

router.route('/').get(protect, getCourses).post(protect, createCourse)
router.route('/:id')
        .delete(protect, deleteCourse)
        .put(protect, updateCourse)
        .get(protect, getCourse)

module.exports = router