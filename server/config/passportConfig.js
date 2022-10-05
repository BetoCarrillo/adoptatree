import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import * as dotenv from "dotenv";
import userModel from "../models/usersModel.js";
dotenv.config();
import passport from "passport";

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET_OR_KEY,
};

const jwtStrategy = new JwtStrategy(jwtOptions, function (jwt_payload, done) {
  userModel.findOne({ _id: jwt_payload.sub }, function (err, user) {
    if (err) {
      return done(err, false);
    }
    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  });
});

const passportConfig = () => {
  passport.use(jwtStrategy);
};

export default passportConfig;
