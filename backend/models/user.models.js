const mongoose = require('mongoose');

let userSchema = new mongoose.Schema({
    name:{
        type:String,
        min:2,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true
    },
    Date:{
        type:Date,
        default:Date().substring(0,10)
    },
    admin:{
        type:Boolean,
        default:false,
    }

},{
    timestamps:true
});

let User = mongoose.model('User',userSchema);

module.exports = User;