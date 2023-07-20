const { Schema, model } = require('mongoose')


/**
 * MongoDB : User Schema.
 */
const UserSchema = Schema({

    fname: {
        type: String,
        required: true
    },

    sname: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true,
        unique: true
    },

    age: {
        type: Number,
        required: true
    },

    favorites: {
        type: [String],
        default: []
    }
})

// MongoDB user model
const UserModel = model('User', UserSchema)


module.exports = { UserModel, UserSchema }