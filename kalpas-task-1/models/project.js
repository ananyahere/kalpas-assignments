const mongoose = require('mongoose')

const projectSchema = new mongoose.Schema({
  description: {
    type: String
  },
  title: {
    type: String
  }
})

const Project = mongoose.model('Project', projectSchema)

module.exports = Project