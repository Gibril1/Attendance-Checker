// these functions are for routes that enables only teachers to perform CRUD operations on the courses they teach

const asyncHandler = require('express-async-handler')
const Course = require('../models/CourseModel')

// @desc Create Course
// @route /api/course/
// @access Private: Teachers
const createCourse = asyncHandler(async(req, res) => {
    try{
        if(!req.user){
            res.status(400)
            throw new Error('Not authorized. No token')
        }
    
        if(req.user.role !== 'teacher'){
            res.status(400)
            throw new Error('You are not a registered teacher')
        }
    
        if(!req.body){
            res.status(404)
            throw new Error('Please enter all fields')
        }

        // ensuring correct inputs
        const { courseCode, name, creditHours } = req.body

        if(!creditHours || !name || name === '' || !courseCode || courseCode === ''){
            res.status(400)
            throw new Error('Please enter the correct input fields')
        }

        
        // checking if similar course code exists
        const courseExists = await Course.findOne({ courseCode })

        if(courseExists){
            res.status(400)
            throw new Error(`Course with course code ${courseCode} already exists`)
        }

    
        const course = await Course.create({
            name: name,
            courseCode: courseCode,
            creditHours: creditHours,
            teacher: req.user.id
        })
    
        res.status(200).json(course)
        
    }catch(error){
        res.status(500)
        throw new Error(error.message)
    }
})

// @desc Update Course
// @route /api/course/:id
// @access Private: Teachers
const updateCourse = asyncHandler(async(req, res) => {
    try {
        const course = await Course.findById(req.params.id)

        if(!course){
            throw new Error(`Course with id ${req.params.id} does not exist`)
        }

        if(!req.user){
            res.status(400)
            throw new Error('Not authorized')
        }

        if(req.user.role !== 'teacher'){
            res.status(400)
            throw new Error('You are not a registered teacher')
        }

        if(course.teacher.toString() !== req.user.id){
            res.status(400)
            throw new Error('You are not authorized to edit the details of this course')
        }

        const updatedCourse = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true})

        res.status(200).json(updatedCourse)
    } catch (error) {
        res.status(500)
        throw new Error(error.message)
    }
})

// @desc Get Course => Courses that have been created for this user
// @route /api/course
// @access Private: Teachers
const getCourse = asyncHandler(async(req, res) => {
    try {
        if(!req.user){
            res.status(400)
            throw new Error('No user. Not authorised')
        }
    
        if(req.user.role !== 'teacher'){
            res.status(400)
            throw new Error('Ypu are not authorized here')
        }
    
        const courses = await Course.find({ teacher: req.user.id})

        res.status(200).json(courses)
    } catch (error) {
        res.status(500)
        throw new Error(error.message)
    }
})

// @desc Delete Course
// @route /api/course/:id
// @access Private: Teachers
const deleteCourse = asyncHandler(async(req, res) => {
    try {
        
        if(!req.user){
            res.status(400)
            throw new Error('Not authorized')
        }

        if(req.user.role !== 'teacher'){
            res.status(400)
            throw new Error('You are not a registered teacher')
        }

        if(course.teacher.toString() !== req.user.id){
            res.status(400)
            throw new Error('You are not authorized to edit the details of this course')
        }

        const course = await Course.findById(req.params.id)

        if(!course){
            throw new Error(`Course with id ${req.params.id} does not exist`)
        }


        await course.remove()
        res.status(204).json({ id: req.params.id })
    } catch (error) {
        
    }

})

module.exports = {
    createCourse,
    updateCourse,
    getCourse,
    deleteCourse
}
