// these functions are for routes that allows students to perform its necessary functions
const asyncHandler = require('express-async-handler')
const Course = require('../models/CourseModel')
const StudentClass = require('../models/StudentClassModel')
const Attendance = require('../models/AttendanceModel')

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
// @routes POST /api/users/join/:id
// @access Private: Student
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
            course: course._id,
            student: req.user.id
        })
    
        res.status(200).json(enrolledStudent)
    
    } catch (error) {
        res.status(500)
        throw new Error(error.message)
    }
})

// @desc Get Joined Courses
// @routes GET /api/courses/joined-courses/
// @access Private: Student
const getJoinedCourses = asyncHandler(async(req, res) => {
    try {
        if(!req.user){
            res.status(400)
            throw new Error('Not authorised. No token')
        }
    
        if(req.user.role !== 'student'){
            res.status(400)
            throw new Error('Not a student. Not authorized')
        }

        const studentCourses = await StudentClass.find({ student: req.user.id })

        const coursesID = studentCourses.map((studentCourse) => studentCourse.course)

        const courses = await Course.find({ _id: { $in: coursesID }})

        res.status(200).json(courses)

    } catch (error) {
        res.status(500)
        throw new Error(error.message)
    }

})


// @desc Check Attendance
// @routes GET /api/students/check/:id
// @access PrivateL Student
const checkAttendanceCount = asyncHandler(async(req, res) => {
    try {
        if(!req.user){
            res.status(400)
            throw new Error('You are not authorized')
        }

        if(req.user.role !== 'student'){
            res.status(400)
            throw new Error('You are not a registered student')
        }

        const course = await Course.findById(req.params.id)

        if(!course){
            res.status(404)
            throw new Error(`Course with id of ${req.params.id} does not exist`)
        }

        const countPresence = await Attendance.countDocuments({ course: course._id}, { student: req.user.id }, { status: 'Present' })

        const countAbsence = await Attendance.countDocuments({ course: course._id}, { student: req.user.id }, { status: 'Present' })

        res.status(200).json({
            presence: countPresence,
            absence: countAbsence
        })
    } catch (error) {
        res.status(500)
        throw new Error(error.message)
    }
})

// @desc Get Attendance List
// @routes GET /api/students/attendance/:id
// @access Private: Student
const getAttendanceList = asyncHandler(async(req, res) => {
    try {
        if(!req.user){
            res.status(400)
            throw new Error('You are not authorized')
        }

        if(req.user.role !== 'student'){
            res.status(400)
            throw new Error('You are not a registered student')
        }

        const course = await Course.findById(req.params.id)

        if(!course){
            res.status(404)
            throw new Error(`Course with id of ${req.params.id} does not exist`)
        }

        const attendanceList = await Attendance.find({ course: course._id }, { student: req.user.id})

        res.status(200).json(attendanceList)

    } catch (error) {
        res.status(500)
        throw new Error(error.message)
    }

})
module.exports = {
    getCourses,
    joinCourse,
    getJoinedCourses,
    checkAttendanceCount,
    getAttendanceList
}