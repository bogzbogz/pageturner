const express = require('express')
const { getBooks, getBookById, bookCreate, rating, delRating, getCategory } = require('../controllers/bookController')
const { auth } = require('../middleware/userMiddleware')
const { upload } = require('../middleware/bookUploadMiddleware')

const router = express.Router()

router.get('/cardBooks', getBooks)
router.get('/getBook/:id', getBookById)
router.post('/createBook', auth, upload.single('cover'), bookCreate);
router.post('/rating/:id', auth, rating)
router.delete('/rating/:id', auth, delRating)
router.get('/category/:categories_id', auth, getCategory)


module.exports = router