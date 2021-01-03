const express = require('express')
const User = require('../models/user')
const router = new express.Router()


router.post('/users', async (req, res) => {
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

router.get('/users', async (req, res) => {

    try{
        const users = await User.find({})
        res.status(200).send(users)
    } catch(error) {
        res.status(400).send(error)
    }

})


router.get('/users/:id',async (req, res) => {
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


router.patch('/users/:id', async (req,res) => {
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



router.delete('/users', async (req, res) => {
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




module.exports = router