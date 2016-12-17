// Redirect to Google
server.get('/auth', passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login', 'https://www.googleapis.com/auth/userinfo.email'] }));

// Process callback
server.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/failure', session: false }),
    function(req, res) {
        // Send token back to client
        res.statusCode = 302;
        res.setHeader('Location', global.config.Misc.ClientUrl + '/account/process.html?token=' + req.user);
        res.setHeader('Content-Length', '0');
        res.end()
    });
