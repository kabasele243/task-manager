const express = require('express');
require('./db/mongoose')

const User = require('./models/user')

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
       res.send(user)})
        .catch((error) => {
        res.status(400).send(error)
        
    })
})

app.get('/users', (req, res) => {
    console.log(req.body)
    res.send('Bouya!!!!!!')
})

app.delete('/users', (req, res) => {
    console.log(req.body)
    res.send('Bouya!!!!!!')
})

app.listen(port, ()=>{
    console.log(`App is running on port ${port}`)
})