const express = require('express')
const User = require('../models/user')
const multer = require('multer')
const auth = require('../middleware/auth')
const { json } = require('express')
const sharp = require('sharp')
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
    
    limits: {
        fileSize: 1000000
    }, 
    fileFilter(req, file, cb){
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){
            return cb(new Error('File Must be an Image'))
        }
        cb(undefined, true)
    }
})

router.post('/users/me/avatar', auth ,upload.single('avatar'), async (req , res) => {
    const buffer = await sharp(req.file.buffer).resize({width: 250, height: 250}).png().toBuffer()
    req.user.avatar = buffer
    
    await req.user.save()
    res.send()
}, (error, req, res, next) => {
    res.status(400).send({error: error.message})
})

router.delete('/users/me/avatar', auth , async (req , res) => {
    req.user.avatar = undefined
    await req.user.save()
    res.send()
}, (error, req, res, next) => {
    res.status(400).send({error: error.message})
})

router.get('/users/:id/avatar', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        if (!user || !user.avatar) {
            throw new Error()
        }
        res.set('Content-Type', 'image/png')
        res.send(user.avatar)
    } catch(error) {
        res.status(404).send()
    }
})

module.exports = router