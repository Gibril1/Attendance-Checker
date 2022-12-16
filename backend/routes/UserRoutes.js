const express = require('express')
const router = express.Router()
const upload = require('../utils/multer')

const { 
    registerUser, 
    loginUser ,
    getUsers
} = require('../controllers/UserControllers')

router.post('/register', upload.single('image'), registerUser)
router.post('/login', loginUser)
router.get('/all', getUsers)

module.exports = router