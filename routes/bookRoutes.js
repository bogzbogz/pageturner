const express = require('express')
const { getBooks, getBookById, bookCreate, rating, delRating, getCategory, randomBook, userRatedBook } = require('../controllers/bookController')
const { auth } = require('../middleware/userMiddleware')
const { upload } = require('../middleware/bookUploadMiddleware')

const router = express.Router()

router.get('/cardBooks', getBooks)
router.get('/getBook/:id', getBookById)
router.post('/rating/:id', auth, rating)
router.delete('/rating/:id', auth, delRating)
router.get('/category/:categories_id', auth, getCategory)

router.post('/createBook', auth, upload.single('cover'), bookCreate);
router.get('/randomBooks', randomBook)
router.get('/userRatedBooks', auth, userRatedBook)

module.exports = router