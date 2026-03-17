const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const path = require('path')
const userRoutes = require('./routes/userRoutes')
const bookRoutes = require('./routes/bookRoutes')



const app = express()
app.use(cors({
    origin: ['http://localhost:5173'],
    credentials: true
}))

app.use(express.json())
app.use(cookieParser())

app.use('/uploads_tmp', express.static(path.join(__dirname, 'uploads_tmp')))
app.use('/users', userRoutes)
app.use('/book', bookRoutes)
module.exports = app