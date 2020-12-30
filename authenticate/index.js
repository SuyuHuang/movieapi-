import passport from 'passport';
import passportJWT from 'passport-jwt';
import UserModel from './../api/users/userModel';
import dotenv from 'dotenv';

dotenv.config();
const ExtractJWT = require('passport-jwt').ExtractJwt;
const JWTStrategy = require('passport-jwt').Strategy;
// const JWTStrategy = passportJWT.Strategy;
// const ExtractJWT = passportJWT.ExtractJwt;

let jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken();
// eslint-disable-next-line no-undef
jwtOptions.secretOrKey = process.env.SECRET;
const strategy = new JWTStrategy(jwtOptions, async (payload, next) => {
  const user = await UserModel.findByUserName(payload);
  if (user) {
    next(null, user);
  } else {
    next(null, false);
  }
});
passport.use(strategy);

export default passport;