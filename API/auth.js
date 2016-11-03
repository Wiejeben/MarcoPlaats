var passport = global.passport;

// Setup Google OAuth strategy
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
passport.use(new GoogleStrategy(global.config.OAuth,
    function(accessToken, refreshToken, profile, done) {

        var User = require('./Models/User');

        User.InsertFromGoogle(server.locals.db, profile, function(Oauth){
            // securtie boeit niet
            // var hash = require('md5')(Oauth);
            return done(null, Oauth);
        });

    }
));

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});