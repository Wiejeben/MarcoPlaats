module.exports = {
    mounted() {
        // Redirect user to front-page if he is not logged in.
        if (!window.LoggedIn)
        {
            window.location.href = '/';
        }

        eventHub.$once('user-undefined', function()
        {
            window.location.href = '/';
        });
    }

}
