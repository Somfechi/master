const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    firstname:{
      type: String,
      required: true
    },
    lastname:{
      type: String,
      required: true
    },    
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true, 
        minlength: 4
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true, 
      minlength: 6
    },
    
    dateOfBirth: Date,

    password: {
        type: String,
        required: true
    },
    roles: {
      User: {
        type: Number,
        default: 210
    },
    Editor: Number,
    Admin: Number
    },
    active: {
        type: Boolean,
        default: true
    },
    refreshToken: String

})

module.exports = mongoose.model('User', userSchema)