const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')
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
        const token = await user.generateAuthToken()
        res.status(201).send({user, token})
    } catch(error){
        res.status(400).send(error)
    }
    
})

router.post('/users/login', auth, async (req, res) => {
    try{
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({user, token})
    } catch(error){
        res.status(400).send()
       
    }
})

router.post('/users/logout', auth , async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()
        res.send()
    } catch(error){
        res.status(500).send()
    }
})

router.post('/users/logout', auth, async (req,res) => {
    
    try {
        req.user.tokens = []
        await req.user.save()
        res.send()
    } catch(error){
        res.status(500).send()
    }
})


router.get('/users', auth, async (req, res) => {

    try{
        const users = await User.find({})
        res.status(200).send(users)
    } catch(error) {
        res.status(400).send(error)
    }

})

router.get('/users/me', auth, async(req, res) => {
    res.send(user)
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
        //Enable Mongoose Middleware to Run
        const user = await User.findById(req.params.id)

        updates.forEach((update) => {
                user[update] = req.body[update]
        })

        await user.save()

        // const user = await User.findByIdAndUpdate(_id, req.body, {new:true, runValidators: true})
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