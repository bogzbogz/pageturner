const express = require('express')

const { auth } = require('../middleware/userMiddleware')
const { upload } = require('../middleware/bookUploadMiddleware')
const { isAdmin } = require('../middleware/isAdminMiddleware')
const { allUser, AllBook } = require('../controllers/adminController')

const router = express.Router()

router.get('/allUser', auth, isAdmin, allUser)
router.get('/allBooks', auth, isAdmin, AllBook)

module.exports = router