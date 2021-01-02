const mongoose = require('mongoose')
const validator = require('validator')


mongoose.connect('mongodb://localhost:27017/task-manager-api', {useNewUrlParser: true, useCreateIndex: true,  useUnifiedTopology: true });

const User = mongoose.model('User', {
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Provide a correct Email.')
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minLength: 7,
        validate(value){
            if(value.toLowerCase().includes('password')){
                throw new Error(`Password cannot contain 'password`)
            }
        }
        
    },
    age: {
        type: Number,
        validate(value) {
            if(value < 0){
                throw new Error('Age must me be a positive number')
            }
        }
    }
});

// const me = new User({
//     name: 'Franck',
//     age: 26
// })

// me.save().then(() => {
//     console.log(me)
// }).catch((error) => {
//     console.log('Error', error)
// })


const Task = mongoose.model('Task', {
    description: {
        type: String,
        required: true,
        trim: true,
    },
    done: {
        type: Boolean,
        default: false
    }
})

const done = new Task({
    description: "Pete",
    done: true
})

done.save()
    .then((done) => {
    console.log(done)})
    .catch((error) => {
    console.log('Error', error)
})