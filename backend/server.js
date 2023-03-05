const express = require('express')
require('dotenv').config()
const port = process.env.PORT || 5000
const colors = require('colors')
const cors = require('cors')
const morgan = require('morgan')
const swaggerUI = require('swagger-ui-express')
const swaggerJsDoc = require('swagger-jsdoc')
const connectDB = require('./config/db')
const { errorHandler } = require('./middleware/errorMiddleware')

// Connect DB
connectDB()

// Swagger Setup
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Attendance Checker API',
            version: '1.0.0',
            description: 'An express API for marking attendance in a school setting'
        },
        servers: [
            {
                url: 'http://localhost:5000'
            }
        ]
    },
    apis:['backend/routes/*.js']
}

const specs = swaggerJsDoc(options)

// Init express app
const app = express()



// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true, limit:"50mb" }))
app.use(errorHandler)
app.use(morgan('dev'))

// Routes
app.use('/api/auth/', require('./routes/AuthRoutes'))
// app.use('/api/courses/', require('./routes/CourseRoutes'))
// app.use('/api/courses/', require('./routes/CourseRoutes'))
app.use('/api/student/', require('./routes/StudentRoutes'))
app.use('/api/teacher/', require('./routes/TeacherRoutes'))
// Define Swagger Route
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs))

// Listen to Port
app.listen(port, () => {
    console.log(`Server is listening at port ${port}`.blue.underline)
})