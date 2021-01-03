const express = require('express')
const Task = require('../models/task')
const User = require('../models/user')
const router = new express.Router()


router.post('/tasks', async (req, res) => {
    const task = new Task({
        description: req.body.description,
        done: req.body.done
    })

    try{
        await task.save()
        res.status(201).send(task)
    } catch(error){
        res.status(400).send(error)
    }

})

router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
    } catch (error) {

    }
})

router.get('/tasks', async (req, res) => {
   

    try{
        const task = await Task.find({})
        res.status(200).send(task)
    } catch(error){
        res.status(400).send(error)
    }
})
 
router.get('/tasks/:id', async (req, res) => {

    const _id = req.params.id
    

    try{
        const task = await Task.findById(_id)
        res.status(200).send(task)
    } catch (error){
        res.status(400).send(error)
    }
})

router.patch('/tasks/:id',async (req, res) =>{
    const updates = Object.keys(req.body)
    const allow = ['description', 'done']
    const isValidOperation = updates.every((update) =>{
            return allow.includes(update)
    })

    if(!isValidOperation){
        return res.status(400).send({ error: 'Invalid updates'})
    }
    const _id = req.params.id

    try{
        //Enable Mongoose Middleware to Run
        const task = await Task.findById(req.params.id)

        updates.forEach((update) => {
                task[update] = req.body[update]
        })

        await task.save()


        // const task = await Task.findByIdAndUpdate(_id, req.body, { new:true, runValidators: true})
        if(!task) {
            return res.status(404).send()
        }
        res.status(200).send(task)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.delete('/tasks/:id', async (req, res) =>{
    const _id = req.params.id

    try{
        const task = await Task.findByIdAndDelete(_id)
        if(!user){
            res.status(404).send()
        }

        res.send(user)
    } catch(error){
        res.status(400).send()
    }
})



module.exports = router