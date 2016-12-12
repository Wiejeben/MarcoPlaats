// Setup Google OAuth strategy
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
passport.use(new GoogleStrategy(global.config.OAuth,
    function(accessToken, refreshToken, profile, done) {
        const User = require('./Models/User');

        let user = new User();
        user.insertFromGoogle(profile, function(result) {
            return done(null, result)
        })
    }
));

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});