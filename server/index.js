const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const { tmdbRouter, userRouter } = require('./routes')


// Initiate environment variables
require('dotenv').config()

// Initiate mongo connection
require('./connections/mongo.connection').connectToMongo()

// Initiate server
const app = express()

// Middlewares
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}))

// App routes
app.use('/tmdb', tmdbRouter)
app.use('/user', userRouter)


app.listen(process.env['SERVER_PORT'], () => console.log(`Server runs on port ${process.env['SERVER_PORT']}`))