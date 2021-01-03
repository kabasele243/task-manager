const express = require('express');
require('./db/mongoose')

const User = require('./models/user')
const Task = require('./models/task')

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json())

app.post('/users', async (req, res) => {
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        age: req.body.age
    })
    
    try {
        await user.save()
        res.status(201).send(user)
    } catch(error){
        res.status(400).send(error)
    }
    
})

app.get('/users', async (req, res) => {

    try{
        const users = await User.find({})
        res.status(200).send(users)
    } catch(error) {
        res.status(400).send(error)
    }

})


app.get('/users/:id',async (req, res) => {
    const _id = req.params.id

    try{
        
        const user = await User.findById(_id)
        if(!user) {
            return res.status(404).send()
        }
        res.status(200).send(user)
    } catch (error) {
        res.status(404).send(error)
    }

})


app.patch('/users/:id', async (req,res) => {
    const updates = Object.keys(req.body)
    const allow = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) =>{
            return allow.includes(update)
    })

    if(!isValidOperation){
        return res.status(400).send({ error: 'Invalid updates'})
    }

    const _id = req.params.id

    try {
        const user = await User.findByIdAndUpdate(_id, req.body, {new:true, runValidators: true})
        if(!user){
            return res.status(404).send()
        }
        res.send(user)
    } catch (error) {
        res.status(400).send(error)
    }
})



app.delete('/users', async (req, res) => {
    const _id = req.params.id
    try{
        const user = await User.findByIdAndDelete(_id)
        if(!user) {
            return res.status(404).send()
        }
        res.send(user)
    } catch(error) {
        res.status(500).send()
    }
})






app.post('/tasks', async (req, res) => {
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

app.get('/tasks', async (req, res) => {
   

    try{
        const task = await Task.find({})
        res.status(200).send(task)
    } catch(error){
        res.status(400).send(error)
    }
})
 
app.get('/tasks/:id', async (req, res) => {

    const _id = req.params.id
    

    try{
        const task = await Task.findById(_id)
        res.status(200).send(task)
    } catch (error){
        res.status(400).send(error)
    }
})

app.patch('/tasks/:id',async (req, res) =>{
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
        const task = await Task.findByIdAndUpdate(_id, req.body, { new:true, runValidators: true})
        if(!task) {
            return res.status(404).send()
        }
        res.status(200).send(task)
    } catch (error) {
        res.status(400).send(error)
    }
})

app.delete('/tasks/:id', async (req, res) =>{
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

app.listen(port, ()=>{
    console.log(`App is running on port ${port}`)
})