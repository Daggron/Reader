const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const expressSession = require('express-session');
const expressValidator = require('express-validator');
require('dotenv').config();

app.use(cors());

app.use(bodyParser.urlencoded({extended:false}));

app.use(expressSession({
    secret:process.env.Secret,
    saveUninitialized:true,
    resave:false,
}));

app.use(expressValidator());

app.use('/users',require('./routes/users.routes'));

const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`Server fired on port ${PORT}`);
});