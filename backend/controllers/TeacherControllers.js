const asyncHandler = require('express-async-handler')
const StudentClass = require('../models/StudentClassModel')
const Student = require('../models/StudentModel')
const Course = require('../models/CourseModel')
const Attendance = require('../models/AttendanceModel')

// @desc Get Students Enrolled In A Particular Class
// @routes /api/teachers/get-students/:id
// @access Private: Teacher
const getEnrolledStudents = asyncHandler(async(req, res) => {
    try {
        if(!req.user){
            res.status(400)
            throw new Error('No user. Not authorised')
        }
    
        if(req.user.role !== 'teacher'){
            res.status(400)
            throw new Error('You are not authorized here')
        }

        // check if course exists
        const course = await Course.findById(req.params.id)

        if(!course){
            res.status(404)
            throw new Error(`Course with id ${req.params.id} does not exist`)
        }

        if(course.teacher.toString() !== req.user.id){
            res.status(400)
            throw new Error('This is not your class. Sir!')
        }

        // getting ID's of students that take this course
        const studentClasses = await StudentClass.find({ course: req.params.id })

        // returns IDs of student that have enrolled in this particular class
        const studentIds = studentClasses.map((studentClass) => studentClass.student )
        
        // finding the details of the students with the particular id
        const students = await Student.find({ userId:{ $in: studentIds }})

        res.status(200).json(students)

        


    } catch (error) {
        res.status(500)
        throw new Error(error.message)
    }
})


// @desc Mark Attendance
// @routes GET /api/teachers/mark
// @access Private: Teacher
const markAttendance = asyncHandler(async(req, res) => {
    try {
        if(!req.user){
            res.status(400)
            throw new Error('No user. Not authorised')
        }
    
        if(req.user.role !== 'teacher'){
            res.status(400)
            throw new Error('You are not authorized here')
        }

        if(!req.body){
            res.status(400)
            throw new Error('Please enter all fields')
        }

        if(!req.body.student || !req.body.status){
            res.status(400)
            throw new Error('Please enter all fields')
        }

        // check if course exists
        const course = await Course.findById(req.params.id)

        if(!course){
            res.status(404)
            throw new Error(`Course with id ${req.params.id} does not exist`)
        }

        // checks if the teacher is permitted to mark attendance
        if(course.teacher.toString() !== req.user.id){
            res.status(400)
            throw new Error('This is not your class. Sir!')
        }

        // marks attendance
        const attendance = await Attendance.create({
            teacher: req.user.id,
            student: req.body.student,
            course: course._id,
            status: req.body.status
        })

        res.status(200).json(attendance)
    } catch (error) {
        res.status(500)
        throw new Error(error.message)
    }

})

module.exports = {
    getEnrolledStudents,
    markAttendance
}