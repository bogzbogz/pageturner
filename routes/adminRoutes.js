const express = require('express')

const { auth } = require('../middleware/userMiddleware')
const { upload } = require('../middleware/bookUploadMiddleware')
const { isAdmin } = require('../middleware/isAdminMiddleware')
const { editUser, deleteUser, allUser, AllBook, editBook, deleteBook  } = require('../controllers/adminController')

const router = express.Router()

router.put('/admin/edit/:user_id', auth, isAdmin, editUser)
router.delete('/admin/delete/:user_id', auth, isAdmin, deleteUser)
router.get('/allUser', auth, isAdmin, allUser)
router.get('/allBooks', auth, isAdmin, AllBook)
router.put('/admin/book/edit/:book_id', auth, isAdmin, upload.single('cover'), editBook)
router.delete('/admin/book/delete/:book_id', auth, isAdmin, deleteBook)

module.exports = router