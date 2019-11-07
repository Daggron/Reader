let mongoose = require('mongoose');

let categorySchema = new mongoose.Schema({
    name:{
        type:String
    }
});

let Category = mongoose.Model('Category',categorySchema);

module.exports = Category;