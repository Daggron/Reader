const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const expressSession = require('express-session');
const expressValidator = require('express-validator');
const passport = require('passport');
const mongoose = require('mongoose');
require('dotenv').config();

const URI = process.env.MONGO_DB
mongoose.connect(URI,{
    useCreateIndex:true,
    useNewUrlParser:true,
    useUnifiedTopology:true,
});

let db = mongoose.connection;

db.once('open',()=>{
    console.log(`Bro Bro Bro`);
});

db.on('error',(err)=>{
    console.log('oopsie their is some problem connecting to db\n'+err);
})

app.use(cors());

app.use(bodyParser.urlencoded({extended:false}));

app.use(express.json());


app.use(expressSession({
    secret:process.env.Secret,
    saveUninitialized:true,
    resave:false,
}));

app.use(expressValidator());

app.use(passport.initialize());
app.use(passport.session());

app.use('/users',require('./routes/users.routes'));

const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`Server fired on port ${PORT}`);
});