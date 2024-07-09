const express = require('express');
const passport = require('passport');
require('../utils/passport.js'); 
const dotenv=require("dotenv");
dotenv.config({path:"backend/config/config.env"});
const {sendTokengooglesignin} =require("../utils/jwttoken.js");
const router = express.Router()
router.get('/google',
  passport.authenticate('google', { session: false, scope: ['profile', 'email'] }));

router.get('/google/callback',
  passport.authenticate('google', { session: false, failureRedirect: `/api/v1/login` }),
  (req, res) => {
     console.log("in google route")
     sendTokengooglesignin(req.user.user,201,res)
    res.redirect(`${process.env.FRONTEND_URL}/account`);
  });
  module.exports= router