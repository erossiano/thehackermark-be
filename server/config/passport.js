import JwtStrategy from "passport-jwt"; 
import ExtractJwt from "passport-jwt"; 
//const JwtStrategy = require("passport-jwt").Strategy;
//const ExtractJwt = require("passport-jwt").ExtractJwt;
import passport from "passport";

import mongoose from "mongoose";

import keys from "./keys.js";

//const User = mongoose.model("users");

const opts = {};
opts.jwtFromRequest = ExtractJwt.ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

const passp = (passport) => {
    passport.use(
        JwtStrategy.Strategy(opts, (jwt_payload, done) => {
        User.findById(jwt_payload.id)
        .then((user) => {
        if (user) {
            return done(null, user);
        }
        return done(null, false);
        })
        .catch((err) => console.log(err));
        })
    );
};

export default passp;