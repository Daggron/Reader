const User= require('../../models/user.models');
const bcrypt = require('bcryptjs');
const LocalStargetgy = require('passport-local').Strategy;

module.exports = async (passport)=>{
    passport.use(new LocalStargetgy({usernameField:email},async (email,password,done)=>{

        let user = await User.findOne({email:email});
        if(!user){
            return done(null,false,{message:'No user with that email is found'});
        }
        else{
            let match = await bcrypt.compare(password,user.password);
            if(!match){
                return done(null,false,{message:"Email and Password do not match"})
            }
            else{
                return done(null,user);
            }
        }
    }));
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });
      
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
          done(err, user);
        });
    });
}