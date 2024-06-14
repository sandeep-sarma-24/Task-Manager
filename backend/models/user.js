const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type : String,
        required : [true, 'Name is required'],
        trim : true
    },
    email: {
        type : String,
        required : [true, 'Please enter your email'],
        trim : true,
        unique : true
    },
    password: {
        type : String,
        required : [true, 'Please enter your password']
    },
    joiningDate: {
        type : Date,
        default : Date.now
    }
},{
    timestamps : true
});

module.exports = mongoose.model('User', userSchema);