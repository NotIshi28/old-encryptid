const passportLocal = require('passport-local'),
    LocalStrategy = (passportLocal.Strategy),
    User = require('../models/userSchema.js');

module.exports = async function initialize(passport) {
    const authenticateUser = async (email, password, done) => {
        User.findOne({ email: email }).then(async user => {
            if (!user) {
                return done(null, false, { msg: 'Not registered, please register on https://www.register.techsyndicate.us' })
            }
            done(null, user)
        })
    }

    await passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser))

    await passport.serializeUser((user, done) => {
        done(null, user._id)
    })
    passport.deserializeUser(async function (id, done) {
        const user = await User.findById(id)
        done(null, user);
    });
}