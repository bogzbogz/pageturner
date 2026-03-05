const express = require('express')
const { getBooks, getBookById, rating, delRating, getCategory } = require('../controllers/bookController')
const { auth } = require('../middleware/userMiddleware')

const router = express.Router()

router.get('/cardBooks', getBooks)
router.get('/getBook/:id', getBookById)
router.post('/rating/:id', auth, rating)
router.delete('/rating/:id', auth, delRating)
router.get('/category/:id', auth, getCategory)


module.exports = router