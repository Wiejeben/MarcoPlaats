require('./bootstrap');
require('./components/bootstrap');

const app = new Vue({
    el: '#app',

    created() {

        if (window.LoggedIn)
        {
            $.get(window.apiUrl + '/auth/user', function(data) {

                if(data.length)
                {
                    window.User = data[0];
                    eventHub.$emit('user-detected', data[0]);
                }
                else
                {
                    window.LoggedIn = false;
                    localStorage.removeItem('authorization');
                    eventHub.$emit('user-undefined');
                }
            });
        }
    }
});
