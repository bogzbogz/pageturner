const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')

const userRoutes = require('./routes/userRoutes')



const app = express()
app.use(cors({
    origin: ['http://127.0.0.1:5173'],
    credentials: true
}))

app.use(express.json())
app.use(cookieParser())

app.use('/users/', userRoutes)

module.exports = app