const express = require('express')
const User = require('../models/user')
const multer = require('multer')
const auth = require('../middleware/auth')
const router = new express.Router()


// Create User
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

//Login User
router.post('/users/login', async (req, res) => {
    try{
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        console.log(user)
        res.send({ user , token})
    } catch(error){
        res.status(400).send()
       
    }
})


// Logout User
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

//Logout All Sessions
router.post('/users/logoutAll', auth, async (req,res) => {
    
    try {
        req.user.tokens = []
        await req.user.save()
        res.send()
    } catch(error){
        res.status(500).send()
    }
})



router.get('/users/me', auth, async(req, res) => {
    res.send(req.user)
})


router.patch('/users/me', auth , async (req,res) => {
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
        updates.forEach((update) => {
                req.user[update] = req.body[update]
        })
        await req.user.save()
        res.send(req.user)
    } catch (error) {
        res.status(400).send(error)
    }
})



router.delete('/users/me', auth ,async (req, res) => {
    const _id = req.user.id
    try{
        await req.user.remove()
        res.send(req.user)
    } catch(error) {
        res.status(500).send()
    }
})

const upload = multer({
    dest: 'avatars'
})


router.post('/users/me/avatar', upload.single('avatar'), (req , res) => {
    res.send()
})


module.exports = router