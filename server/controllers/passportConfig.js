const User = require('../models/users');
const bcrypt = require('bcryptjs');
const localStrategy = require('passport-local').Strategy;


module.exports = function (passport) {
    passport.use(
        new localStrategy({ usernameField: 'username' }, async (username, password, done) => {
            try {
                const user = await User.findOne({ username: username });
                if (!user) {
                    return done(null, false);
                }

                const isMatch = await bcrypt.compare(password, user.password);
                if (isMatch) {
                    return done(null, user);
                } else {
                    return done(null, false);
                }
            } catch (err) {
                return done(err);
            }
        })
    );
    
    passport.serializeUser((user, cb) => {
        cb(null, user.id);
    });

    passport.deserializeUser(async (id, cb) => {
        try {
            const user = await User.findOne({ _id: id });
            cb(null, user);
        } catch (err) {
            cb(err);
        }
    });
};
