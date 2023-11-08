//DEPENDENCIES
const express = require('express')
const methodOverride = require('method-override')
const mongoose = require('mongoose')

//CONFIGURATION
require('dotenv').config()
const PORT = process.env.PORT
const app = express()
// console.log(PORT)

// MIDDLEWARE
app.set('views', __dirname + '/views')
app.set('view engine', 'jsx')
app.engine('jsx', require('express-react-views').createEngine())
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))
app.use(methodOverride('_method'))


// ROUTES
app.get('/', (req, res) => {
    res.send('Welcome to an Awesome App about Breads!')
})

// Breads
const breadsController = require('./controllers/breads_controllers.js')
app.use('/breads', breadsController)

// Bakers
const bakersController = require('./controllers/bakers_controllers.js')
app.use('/bakers', bakersController)

// mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true})
// const db = mongoose.connection;
// db.on("error", console.error.bind(console, "connection error: "));
// db.once("open", function () {
//   console.log("Connected successfully");
// });

// mongoose.connect().then(() => console.log('Connected'))
// mongoose.connect(process.env.MONGO_URI).then( => console.log('Connected'))

mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log('connected to mongo: ', process.env.MONGO_URI))


// 404 Page
app.get('*', (req, res) => {
    res.send('404')
})

// LISTEN
app.listen(PORT, () => {
    console.log('listening on port', PORT)
})