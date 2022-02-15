const mongoose = require('mongoose')
const connection = require('../config/db_connect')

const EmployeeSchema = new mongoose.Schema({
  employee_id: {
    type: Number, 
    required: true
  },
  first_name: {
    type: String
  },
  last_name: {
    email: String
  },
  email: {
    type: String
  },
  phoneNo: {
    type: String
  },
  hire_date: {
    type: String
  },
  job_id: {
    type: String
  },
  salary: {
    type: String
  },
  manager_id: {
    type: String
  },
  department_id: {
    type: String
  }
})

const Employee = connection.model('Employee', EmployeeSchema)

module.exports = Employee