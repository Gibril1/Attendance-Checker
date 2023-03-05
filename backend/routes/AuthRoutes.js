const express = require('express')
const router = express.Router()
const upload = require('../utils/multer')
const multer = require('multer')

const { 
    registerUser, 
    loginUser ,
    getUsers
} = require('../controllers/AuthControllers')

/**
 * @swagger
 * components:
 *  schemas:
 *      Authentication:
 *          type: object
 *          required:
 *              - email
 *              - password
 *              - role
 *          properties:
 *              id:
 *                  type: mongoose.Types.ObjectId
 *                  description: The auto-generated id of the user
 *              email:
 *                  type: string
 *                  description: Email of the user
 *              password:
 *                  type: string
 *                  description: Password of the user
 *              role:
 *                  type: string
 *                  description: Role of the user
 *              firstName:
 *                  type: string
 *                  description: First name of the user
 *              lastName:
 *                  type: string
 *                  description: Last name of the user
 *              userId:
 *                  type: mongoose.Types.ObjectId
 *                  description: Foreign key field for the user model
 *              avatar:
 *                  type: string
 *                  description: URL representation of the image stored in cloudinary
 *              cloudinaryId:
 *                  type: string
 *                  description: The id of the image in cloudinary
 */



/**
 * @swagger
 * tags:
 *      name: Authentication
 *      description: Student, Teacher and User Authentication
 */


/**
 * @swagger
 * paths:
 *      /api/auth/register:
 *      post:
 *          summary: Registration endpoint for users
 *      tags: [Authentication]
 *      requestBody:
 *          required: true
 *      content:
 *          multipart/form-data:
 *              schema:
 *                  $ref: '#/components/schemas/Authentication'
 *      responses:
 *          200:
 *              description: Successful Registration
 *              content:
 *                  string:
 *      security:
 *          -bearerAuth: []
 *          x-swagger-router-controller: AuthControllers
 *          x-swagger-router-model: Authentication
 */
router.post('/register', upload.single('image'), registerUser)


/**
 * @swagger
 * paths:
 *      /api/auth/login:
 *      post:
 *          summary: Login endpoint for users. Email and Password
 *      tags: [Authentication]
 *      requestBody:
 *          required: true
 *      content:
 *          application/json:
 *              schema:
 *                  $ref: '#/components/schemas/Authentication'
 *      responses:
 *          200:
 *              description: Returns a JSON web token
 *              content:
 *                  string:
 *                  $ref: '#components/schemas/Authentication'
 */
router.post('/login', loginUser)
router.get('/all', getUsers)

module.exports = router