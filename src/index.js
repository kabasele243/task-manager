const express = require('express');
require('./db/mongoose')

const User = require('./models/user')
const Task = require('./models/task')

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json())

app.post('/users', (req, res) => {
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        age: req.body.age
    })
    
    
    user.save()
        .then((user) => {
            res.status(201).send(user)})
        .catch((error) => {
            res.status(400).send(error)
        
    })
})

app.get('/users', (req, res) => {

    User.find({}).then((user) => 
        res.status(200)
        .send(user))
        .catch((error) => {
            res.send(400).send(error)
        })
})


app.get('/users/:id', (req, res) => {
    const _id = req.params.id;

    User.findById(_id).then((user) => {
        // if(!user){
        //     return res.status(404)
        // }
        res.send(user)
    }).catch((error) => {
        res.status(404).send(error)
    })

    
    
})

app.delete('/users', (req, res) => {
    console.log(req.body)
    res.send('Bouya!!!!!!')
})






app.post('/tasks', (req, res) => {
    const task = new Task({
        description: req.body.description,
        done: req.body.done
    })

    task.save()
        .then((task) => {
            res.status(201).send(task)})
        .catch((error) => {
            res.status(400).send(error)
    })

})

app.get('/tasks', (req, res) => {
    Task.find({}).then((task) => {
        res.status(200).send(task)
    }).catch((error) => {
        res.status(400).send(error)
    })
})

app.get('/tasks/:id', (req, res) => {
    const _id = req.params.id

    Task.findById(_id).then((task) => {
        if(!task) {
            return res.status(404).send()
        }
        res.status(200).send(task)
    }).catch((error) => {
        res.status(400).send(error)
    })
})

app.listen(port, ()=>{
    console.log(`App is running on port ${port}`)
})