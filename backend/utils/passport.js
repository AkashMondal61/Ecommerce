const passport = require('passport');
const { Strategy: GoogleStrategy } = require('passport-google-oauth20');
const UserModel =require('../models/usermodel.js');
const bcrypt=require("bcryptjs");
const dotenv=require("dotenv");
dotenv.config({path:"backend/config/config.env"});
passport.use(new GoogleStrategy({
  clientID: process.env.CLIENT_ID,
  clientSecret:process.env.CLIENT_SECRET,
  callbackURL: "/auth/google/callback",
  scope: ["profile", "email"],
},
  async (accessToken, refreshToken, profile, done) => {
    try {
      let user = await UserModel.findOne({ email: profile._json.email });
      if (!user) {
        const lastSixDigitsID = profile.id.substring(profile.id.length - 6);
        const lastTwoDigitsName = profile._json.name.substring(profile._json.name.length - 2);
        const newPass = lastTwoDigitsName + lastSixDigitsID
        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const hashedPassword = await bcrypt.hash(newPass, salt);
        console.log("authoreroutes before save")
        user = await UserModel.create({
          name: profile._json.name,
          email: profile._json.email,
          password: hashedPassword,
          avatar:{
          public_id:null,
          url:null
        }
        })
      }
    return done(null, { user});

    } catch (error) {
      console.log("authoreroutes")
      return done(error);
    }
  }
));