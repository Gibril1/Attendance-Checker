const express = require('express')
require('dotenv').config()
const port = process.env.PORT || 5000
const colors = require('colors')
const cors = require('cors')
const connectDB = require('./config/db')

// Connect DB
connectDB()

// Init express app
const app = express()

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true, limit:"50mb" }))


// Listen to Port
app.listen(port, () => {
    console.log(`Server is listening at port ${port}`)
})