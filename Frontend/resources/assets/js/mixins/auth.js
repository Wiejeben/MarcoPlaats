module.exports = {
    mounted() {
        // Redirect user to front-page if he is not logged in.
        if (!window.LoggedIn)
        {
            window.location.href = '/';
        }

        eventHub.$emit('user-undefined', function()
        {
            window.location.href = '/';
        });
    }

}
