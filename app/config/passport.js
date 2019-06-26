import { Strategy, ExtractJwt } from 'passport-jwt';

import User from '../models/User';

const JwtStrategy = Strategy;

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = "secret";

export default (passport) => {
  passport.use(
    'jwt',
    new JwtStrategy(opts, (jwt_payload, done) => {
      try {
        User.findOne({ name: jwt_payload.name }).then(user => {
          if (user) {
            console.log('user found in db in passport');
            // note the return removed with passport JWT - add this return for passport local
            done(null, user);
          } else {
            console.log('user not found in db');
            done(null, false);
          }
        });
      } catch (err) {
        done(err);
      }
    }),
  );
};