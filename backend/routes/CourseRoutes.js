const express = require('express');
const router = express.Router();

const { 
    createCourse, 
    updateCourse, 
    getCourse, 
    getCourses,
    deleteCourse 
} = require('../controllers/CourseControllers');

const { protect } = require('../middleware/authMiddleware');

/** 
* @swagger
* components:
*   schemas:
*       Course:
*           type: object
*           required:
*               - courseCode
*           properties:
*               id:
*                   type: mongoose.Types.ObjectId
*                   description: The auto-generated id of the course
*               name:
*                   type: string
*                   description: The name of the course
*               courseCode:
*                   type: string
*                   description: The course code
*               creditHours:
*                   type: number
*                   description: The number of credit hours
*               teacher:
*                   type: string
*                   description: Foreign key representation of the teacher who created the course
*/


/**
 * @swagger
 * tags:
 *      name: Course
 *      description: The courses created by the teachers
 */


/**
 * @swagger
 * paths:
 *   /api/courses/:
 *     get:
 *       summary: Returns the list of all courses created by the teacher
 *       tags: [Course]
 *       responses:
 *         '200':
 *           description: The list of courses
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/Course'
 *     post:
 *       summary: Create a new course
 *       tags: [Course]
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Course'
 *       responses:
 *         '200':
 *           description: The course was successfully created
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Course'
 */


router.route('/')
  .get(protect, getCourses)
  .post(protect, createCourse);

/**
 * @swagger
 * paths:
 *   /api/courses/{id}:
 *     get:
 *       summary: Get the course by id
 *       tags: [Course]
 *       parameters:
 *         - in: path
 *           name: id
 *           schema:
 *             type: string
 *           required: true
 *           description: The course id
 *       responses:
 *         '200':
 *           description: The course description by id
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Course'
 *         '404':
 *           description: The course was not found
 *     delete:
 *       summary: Delete the course by id
 *       tags: [Course]
 *       parameters:
 *         - in: path
 *           name: id
 *           schema:
 *             type: string
 *           required: true
 *           description: The course id
 *       responses:
 *         '204':
 *           description: The course was deleted
 *         '404':
 *           description: The course was not found
 *     put:
 *       summary: Update the course by id
 *       tags: [Course]
 *       parameters:
 *         - in: path
 *           name: id
 *           schema:
 *             type: string
 *           required: true
 *           description: The course id
 *       requestBody:
 *         required: true
 */

router.route('/:id')
            .get(protect, getCourse)
            .delete(protect, deleteCourse)
            .put(protect, updateCourse)





