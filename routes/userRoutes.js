const express = require('express')
const { register, login, logout, whoAmI, editUsername, editEmail, editPassword  } = require('../controllers/userController')
const { auth } = require('../middleware/userMiddleware')

const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.get('/whoami', auth, whoAmI)
router.post('/logout', auth, logout)
router.put('/editUsername', auth, editUsername)
router.put('/editEmail', auth, editEmail)
router.put('/editPassword', auth, editPassword)

module.exports = router