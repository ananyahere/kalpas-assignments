const router = require("express").Router()
const Project = require('../models/project')
const isAuth = require('../middleware/isAuth')

// CREATE => employee create project
router.post("/create", isAuth,async (req, res) => {
  const {description, title} = req.body
  try{
    console.log("req.body: ",req.body)
    const project = await Project.create({description, title})
    res.status(201).send(project)
  }catch(e){
    console.log(e)
    res.status(500)
  }
})

// UPDATE => employee update project
router.patch("/update/:id", isAuth, async (req, res) => {
  const projectID = req.params.id.trim()
  // get array of properties request-body wants to update
  const desiredUpdates = Object.keys(req.body)
  try{
    const project = await Project.findOne({_id: projectID})
    if(!project) res.status(404).send({error: 'No such project found.'})
    desiredUpdates.forEach((update) => {
      project[update] = req.body[update]
    })

    await project.save()
    res.status(200).send({updatedProject: project})
  }catch(e){
    console.log(e)
    res.status(500)
  }
})

// READ => employee reads all projects
router.get("/read", isAuth, async (req, res) => {
  try{
    const projects = await Project.find()
    res.send(projects)
  }catch(e){
    console.log(e)
    res.status(500)
  }
})

// DELETE => employee delete project
router.delete("/delete/:id", isAuth, async(req, res) => {
  const projectID = req.params.id.trim()
  try{
    const project = await Project.findOneAndDelete({_id: projectID}) 
    if(!project) {
      return res.status(404).send({error: "No such project found."})
    }
    res.status(200).send(`project (${projectID}) is successfully deleted`)
  }catch(e){
    console.log(e)
    res.status(500)
  }
})

module.exports = router

