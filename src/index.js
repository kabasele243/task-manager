const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json())

app.post('/users', (req, res) => {
    console.log(req.body)
    res.send('Bouya!!!!!!')
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