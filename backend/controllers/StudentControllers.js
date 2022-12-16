// these functions are for routes that allows students to perform its necessary functions
const asyncHandler = require('express-async-handler')
const Course = require('../models/CourseModel')
const StudentClass = require('../models/StudentClassModel')

// @desc Get All Courses
// @routes GET /api/users/
// @access Private: Student
const getCourses = asyncHandler(async(req, res) => {
    if(!req.user){
        res.status(400)
        throw new Error('Not authorised. No token')
    }

    if(req.user.role !== 'student'){
        res.status(400)
        throw new Error('Not a student. Not authorized')
    }

    const courses = await Course.find()
    res.status(200).json(courses)
})


// @desc Join A Course
// @routes GET /api/users/join/:id
const joinCourse = asyncHandler(async(req, res) => {
    try {
        if(!req.user){
            res.status(400)
            throw new Error('Not authorised. No token')
        }
    
        if(req.user.role !== 'student'){
            res.status(400)
            throw new Error('Not a student. Not authorized')
        }
    
        // check if course exists
        const course = await Course.findById(req.params.id)
    
        if(!course){
            res.status(404)
            throw new Error(`Course with id ${req.params.id} does not exist`)
        }
    
        // enroll a student into a class
        const enrolledStudent = await StudentClass.create({
            course: req.params.id,
            student: req.user.id
        })
    
        res.status(200).json(enrolledStudent)
    
    } catch (error) {
        res.status(500)
        throw new Error(error.message)
    }
})

module.exports = {
    getCourses,
    joinCourse
}