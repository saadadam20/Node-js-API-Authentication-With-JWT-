const mongoose = require('mongoose');

const schema = mongoose.Schema({
    name:{
        type: String,
        min : 5, 
        required : true
    },
    email:{
        type: String,
        min : 5, 
        required : true
    },
    password :{
        type: String,
        min : 5, 
        required : true
    },
});

module.exports = mongoose.model('User', schema);