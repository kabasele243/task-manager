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

    const user = await User.find({})

    try{
        res.status(200).send(user)
    } catch(error) {
        res.status(400).send(error)
    }

})


app.get('/users/:id',async (req, res) => {

    const _id = req.params.id
    const user = await User.findById(_id)

    try{
        // if(!user) {
        //     return res.status(404).send()
        // }
        res.status(200).send(user)
    } catch (error) {
        res.status(404).send(error)
    }

})

app.delete('/users', (req, res) => {
    console.log(req.body)
    res.send('Bouya!!!!!!')
})






app.post('/tasks',async (req, res) => {
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
   const task = await Task.find({})

    try{
        res.status(200).send(task)
    } catch(error){
        res.status(400).send(error)
    }
})
 
app.get('/tasks/:id', async (req, res) => {

    const _id = req.params.id
    const task = await Task.findById(_id)

    try{
        res.status(200).send(task)
    } catch (error){
        res.status(400).send(error)
    }
})

app.listen(port, ()=>{
    console.log(`App is running on port ${port}`)
})