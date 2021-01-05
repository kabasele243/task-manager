const mongoose = require('mongoose')
const validator = require('validator')


const Task = mongoose.model('Task', {
    description: {
        type: String,
        required: true,
        trim: true,
    },
    done: {
        type: Boolean,
        default: false
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
})


module.exports = Task;