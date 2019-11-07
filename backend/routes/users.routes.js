const router = require('express').Router();
const User = require('../models/user.models');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const passport = require('passport');
require('../routes/auth/authenticate.routes')(passport);



let transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user: 'maihoodon01@gmail.com',
        pass: 'camyreclcvucprzb'
    }
});

router.route('/create/user').post(async (req,res)=>{

    let found = await User.findOne({email:req.body.email});

    if(found){
        return res.status(400).json('User with that email already exists please try another email');
    }

    req.check('name','Please enter more than s characters ').isLength({min:2});
    req.check('email','Please enter a valid email').isEmail();
    req.check('password','Password do not match').matches(req.body.confirmPassword);
    req.check('password','Password should be minimum 8 characters long').isLength({min:7});

    let errors = await req.validationErrors();
    if(errors){
        let err = errors.map(e=>e.msg);
        return res.status(401).json(err);
    }
    else{

        let user = new User();
        user.name = req.body.name;
        user.email = req.body.email;
        let salt =  await bcrypt.genSalt(10);
        let hash = await bcrypt.hash(req.body.password,salt);
        user.password = hash;

        transporter.sendMail({
           from : ' "Daggron 👻" returnofking04@gmail.com',
           to: `${user.email}`,
           subject:'Signup at reader',
           html: 'Hey you have just signed up for readers'
       });

       console.log(`message sent`);



        User.create(user)
        .then((user)=>{
            res.json('User created Successfully'+user);
        })
        .catch((err)=>{
            res.status(400).json('Oopsie There is some error'+err);
        });
    }

});



router.route('/login').post((req,res,next)=>{    
    passport.authenticate('local',{
        successRedirect:'/articles/data',
        failureRedirect:'/users/login',
        failureFlash:false
    })(req,res,next);
});




router.route('/logout').get((req,res)=>{
    req.logout();
    res.redirect('/users/login');
});



module.exports = router;