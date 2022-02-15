const jwt = require("jsonwebtoken")
const Employee = require('../models/employee')

const isAuth = async (req, res, next) => {
  try{
    const token = req.header("Authorization").replace("Bearer ", "")
    const decodedEmployee = jwt.verify(token, process.env.JWT_SECRET)
    // find employee having decoded user
    const employee = await Employee.findOne({
      _id: decodedEmployee._id,
    })
    if(!employee) throw new Error()
    req.token = token;
    req.employee = employee;
    next()
  }catch(e){
    res.status(401).send({error: `Please Authenticate.`})
  }
}

module.exports = isAuth