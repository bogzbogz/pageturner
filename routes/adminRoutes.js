const express = require('express')

const { auth } = require('../middleware/userMiddleware')
const { upload } = require('../middleware/bookUploadMiddleware')
const { isAdmin } = require('../middleware/isAdminMiddleware')
const { editUser, deleteUser, allUser, AllBook } = require('../controllers/adminController')

const router = express.Router()

router.put('/admin/edit/:user_id', auth, isAdmin, editUser)
router.delete('/admin/delete/:user_id', auth, isAdmin, deleteUser)
router.get('/allUser', auth, isAdmin, allUser)
router.get('/allBooks', auth, isAdmin, AllBook)

module.exports = router