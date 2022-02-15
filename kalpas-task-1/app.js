const express = require('express')
const path = require('path')
require('dotenv').config()
const PORT = 3000
const app = express()
const authRoutes = require('./routers/auth')
const projectRoutes = require('./routers/project')
const dbURI = require('./config/keys').mongoURI
const mongoose = require("mongoose")


// View Engine setup
const viewDirPath = path.join(__dirname, 'views')
app.set('views', viewDirPath)
app.set('view engine', 'ejs')

app.get("/", async (req, res) => {
  res.render("index")
})

app.use(express.json())
app.use(express.urlencoded())

// Routes
app.use(authRoutes)
app.use(projectRoutes)

// database connection
mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) => {
    console.log('mongoose connected')
    app.listen(PORT, () => {
      console.log(`Listening at port ${PORT}`);
    })
  }
  )
  .catch((err) => console.log(err));
