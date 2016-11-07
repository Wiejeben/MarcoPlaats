module.exports = function(role, feedback) {
    "use strict";

    // Redirect user to front-page if he is not logged in.
    if (!window.LoggedIn) {
        window.location.href = '/';
    }

    eventHub.$once('user-undefined', function() {
        window.location.href = '/';
    });

    eventHub.$on('user-detected', function(user) {
        if (user.Role != role)
        {
            window.location.href = '/';
            console.log('redirect');
            return;
        }

        if (typeof feedback != "undefined")
        {
            feedback();
        }
    });
}