const mongoose = require('mongoose');
const { model } = require('./LaptopSchema');

const LoginSchema = new mongoose.Schema({
    Email:{
        type:String,
    },
    TextArea:{
        type:String,
    }
})

module.exports = mongoose.model('Login',LoginSchema);