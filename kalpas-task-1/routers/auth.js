const router = require("express").Router()
const express = require("express")
const Employee = require('../models/employee')

router.post("/signup", async (req, res) => {
  const employee = new Employee(req.body)
  try{
    await employee.save()
    const token = await employee.generateAuthToken()
    res.status(201).send({employee, token})
  }catch(e){
    console.log(e)
    res.status(500)
  }
})

router.post("/login", async (req, res) => {
  try{
    const employee = await Employee.findByCredentials(req.body.email, req.body.phoneNo)
    // create token everytime employee login
    const token = await employee.generateAuthToken()
    res.status(200).send({employee, token})
  }catch(e){
    console.log(e)
    res.status(500)
  }
})

module.exports = router


