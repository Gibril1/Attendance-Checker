const cloudinary = require('./cloudinary')
const multer = require('multer')
const { CloudinaryStorage } = require('multer-storage-cloudinary')

// Multer config
const storage = CloudinaryStorage({
    cloudinary: cloudinary,
    folder:'samples',
    allowedFormats:['jpg', 'png'] 
})

const upload = multer({ storage: storage })

module.exports = upload