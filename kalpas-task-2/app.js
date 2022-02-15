const express = require('express')
require('dotenv').config()
// act as middleware
const fileUpload = require('express-fileupload')
const path = require('path')
const PORT = 3000
const app = express()
var fileRoutes = require('./routes/file')


// View Engine setup
const viewDirPath = path.join(__dirname, 'views')
app.set('views', viewDirPath)
app.set('view engine', 'ejs')

app.use(fileUpload())

app.get("/", async (req, res) => {
  res.render('index')
})

// Routes
app.use(fileRoutes)

app.listen(PORT, () => console.log(`Listening at port ${PORT}`))