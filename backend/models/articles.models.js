const mongoose = require('mongoose');

let articleSchema = new mongoose.Schema({
    title:{
        type:String,
    },
    description:{
        type:String,
    },
    author:{
        type:String,
    },
    authorProfile:{
        type:String,
    },
    Date:{
        type:Date,
        default:Date().substring(0,10)
    },
    likes:{
        type:Number,
        default:0,
    }
},{
    timestamps:true
})

module.exports = Articles