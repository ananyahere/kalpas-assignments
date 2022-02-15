const router = require("express").Router()
const path = require('path')
const uuid = require('uuid')
const csvtojson = require("csvtojson")
const Employee = require('../model/employee')

router.post('/fileUpload', async (req, res) => {
  try{
// upload CSV to public/uploads folder
    const file = req.files.mFile
    // unique name to avoid over-writing of files with same name
    const fileName = uuid.v1() + path.extname(file.name)
    // Note: check the path
    const savePath = path.join(__dirname, '..', 'public', 'uploads', fileName)
    console.log(savePath)
    await file.mv(savePath)
// parse uploaded csv's data
    const data = await csvtojson().fromFile(savePath)
    // console.log(data)
// insert the parsed csv data to Mongodb
    const result = Employee.insertMany(data)
    console.log("inserted ", result)

// redirect user to home page
    res.redirect('/')
   
  }catch(e){
    console.log(e)
    res.send('Error uploading the file')
  }
})

module.exports = router
