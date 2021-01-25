const express = require('express')
const app = express()
const userRouter = require('./router/main')
const port = 3000
const mongoose = require('mongoose')
// Connect database mongodb
mongoose.connect('mongodb://localhost/crud_basic', {useNewUrlParser: true, useUnifiedTopology: true})

// Parsing data setiap data yang masuk sebagai request permintaan
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// Set templating engine
app.set('views', './views')
app.set('view engine', 'ejs')

// Akses static file 
app.use('/assets', express.static('public'))

// Middleware
const checkLogin = function(req, res, next){
    req.time = new Date()
    next()
}

app.use(checkLogin)

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

app.use(userRouter)

