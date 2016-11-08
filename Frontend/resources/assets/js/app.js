require('./bootstrap');
require('./components/bootstrap');

const app = new Vue({
    el: '#app',

    created() {

        if (window.LoggedIn)
        {
            $.get(window.apiUrl + '/auth/user', function(data) {
                if(data && JSON.stringify(data) != '{}')
                {
                    if(data.Role != 'blocked'){
                        window.User = data;
                        eventHub.$emit('user-detected', data);
                    }else{
                        window.LoggedIn = false;
                        localStorage.removeItem('authorization');
                        window.location.href = "/";
                    }
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
