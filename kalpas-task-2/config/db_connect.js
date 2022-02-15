const mongoose = require("mongoose")
// DB string
const db = require('./keys').mongoURI
// Connect to Mongoose
const connection = mongoose.createConnection(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })

module.exports = connection

