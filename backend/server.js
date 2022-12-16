const express = require('express')
require('dotenv').config()
const port = process.env.PORT || 5000
const colors = require('colors')
const cors = require('cors')
const connectDB = require('./config/db')
const { errorHandler } = require('./middleware/errorMiddleware')

// Connect DB
connectDB()

// Init express app
const app = express()

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true, limit:"50mb" }))
app.use(errorHandler)

// Routes
app.use('/api/auth/', require('./routes/AuthRoutes'))
app.use('/api/course/', require('./routes/CourseRoutes'))
app.use('/api/student/', require('./routes/StudentRoutes'))

// Listen to Port
app.listen(port, () => {
    console.log(`Server is listening at port ${port}`)
})