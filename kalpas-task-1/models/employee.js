const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const EmployeeSchema = new mongoose.Schema({
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
  token: {
    type: String
  }
})

EmployeeSchema.methods.generateAuthToken = async function () {
  const employee = this
  const token = jwt.sign({_id: employee._id.toString()}, process.env.JWT_SECRET)
  employee.token = token
  // save token to database
  console.log("generateAuthToken")
  await employee.save()
  return token;
}

EmployeeSchema.statics.findByCredentials = async (email, phoneNo) => {
  const employee = await Employee.findOne({email,phoneNo})
  if(!employee) throw new Error("Unable to login")
  console.log("findByCredentials")
  return employee;
}

const Employee = mongoose.model('Employee', EmployeeSchema)

module.exports = Employee