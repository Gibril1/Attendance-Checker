const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const cloudinary = require('../utils/cloudinary')
const Teacher = require('../models/TeacherModel')
const Student = require('../models/StudentModel')
const User = require('../models/UserModel')


const registerUser = asyncHandler(async(req, res) => {
    if(!req.body){
        res.status(404)
        throw new Error('Enter all fields')
    }

    if(!req.body.role){
        res.status(400)
        throw new Error('Role has not been defined')
    }

    if(req.body.role == 'student' && 
        (!req.body.referenceNumber || req.body.referenceNumber === '')){
        res.status(400)
        throw new Error('Reference Number not defined')
    }

    // object destructuring
    const { email, password, referenceNumber } = req.body

    // ensuring two students do not have the same reference number
   const studentExists = await Student.findOne({ referenceNumber })

   if(studentExists){
        res.status(400)
        throw new Error(`Student with reference number ${referenceNumber} already exists`)
   }

    // upload the image to cloudinary
    const result = await cloudinary.uploader.upload(req.file.path)

    // check if user exists
    const userExists = await User.findOne({ email })

    if(userExists){
        res.status(400)
        throw new Error('User already exists. Login')
    }

    // hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // create user
    const user = await User.create({
        email: email,
        password: hashedPassword,
        role: req.body.role
    })

    // store details into respective tables
    if(user.role === 'teacher'){
        const teacher = await Teacher.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            otherName: req.body.otherName,
            userId: user._id,
            avatar: result.secure_url,
            cloudinaryId: result.public_id
        })
        res.status(200).json({
            'message':`Account has been created for ${teacher.firstName}`
        })
    } else {
        const student = await Student.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            otherName: req.body.otherName,
            referenceNumber: req.body.referenceNumber,
            userId: user._id,
            avatar: result.secure_url,
            cloudinaryId: result.public_id
        })
        res.status(200).json({
            'message':`Account has been created for ${student.firstName}`

        })
    } 
    
    
})

    
// @desc Login
// @route /api/user/login
// @access Login
const loginUser = asyncHandler(async(req, res) => {
    // receive inputs from user
    const { email, password } = req.body

    // check if inputs have been supplied
    if(!email || !password){
        res.status(400)
        throw new Error('Please enter all fields')
    }

    // check if user exists
    const user = await User.findOne({ email })

    if(!user){
        res.status(400)
        throw new Error(`No user with email ${email} exists`)
    }

    if(user && bcrypt.compare(password, user.password)){
        res.status(200).json({
            id: user._id,
            token: generateToken(user._id)
        })
    }
})


// @desc Get All Users
// @route /api/users/all
// @access Public
const getUsers = asyncHandler(async(req, res) => {
    const users = await User.find()
    res.status(200).json(users)
    
})

// @desc generates token every time users logs in 
// @usage for authentication and authorization purposes
const generateToken = ( id ) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d'})
}

module.exports = {
    registerUser,
    loginUser,
    getUsers
}
