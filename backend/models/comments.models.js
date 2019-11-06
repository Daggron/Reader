const mongoose = require('mongoose');

let comment = new mongoose.Schema({
    article:{type:String},
    text:{type:String},
});

let Comment = mongoose.model('Comment',comment);

module.exports = Comment;


