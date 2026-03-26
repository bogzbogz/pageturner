const express = require('express')
const { register, login, logout, whoAmI, allUser } = require('../controllers/userController')
const { auth } = require('../middleware/userMiddleware')
const { isAdmin } = require('../middleware/isAdminMiddleware')


const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.get('/whoami', auth, whoAmI)
router.post('/logout', auth, logout)
router.get('/admin/allUser', auth, isAdmin, allUser)

module.exports = router