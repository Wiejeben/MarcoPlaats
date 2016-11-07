module.exports = {
    data() {
        return {
            Roles: [
                { name: 'admin', selected: false },
                { name: 'user', selected: false }, 
                { name: 'blocked', selected: false }
            ],
        }
    },
    mounted() {
        // Redirect user to front-page if he is not logged in.
        if (!window.LoggedIn){
            window.location.href = '/';
        }

        eventHub.$once('user-undefined', function(){
            window.location.href = '/';
        });
    }
}
