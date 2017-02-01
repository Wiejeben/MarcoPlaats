require('./bootstrap');
require('./components/bootstrap');
global.moment = require('moment');
global.moment.locale('nl');

const app = new Vue({
    el: '#app',

    created() {
        if (window.LoggedIn)
        {
            $.get(window.apiUrl + '/auth/user', data => {
                if(data && JSON.stringify(data) != '{}')
                {
                    if(data.Role == 'blocked')
                    {
                        window.LoggedIn = false;
                        localStorage.removeItem('authorization');
                        window.location.href = "/?feedback=blocked"
                    }
                    else
                    {
                        window.User = data;
                        eventHub.$emit('user-detected', data)
                    }
                }
                else
                {
                    window.LoggedIn = false;
                    localStorage.removeItem('authorization');
                    eventHub.$emit('user-undefined')
                }
            })
        }
    },

    mounted() {
        switch(location.search.split('feedback=')[1]) {
            case 'blocked':
                eventHub.$emit('show-alert', { Type: 'danger', Message: 'Uw account is geblokkeerd.' });
                break;

            case 'token_undefined':
                eventHub.$emit('show-alert', { Type: 'warning', Message: 'Er is helaas iets is gegaan tijdens het inlogproces met Google, probeer het opnieuw.' });
                break;

            case 'localstorage':
                eventHub.$emit('show-alert', { Type: 'warning', Message: 'Uw browser ondersteunt geen localStorage, hierdoor kan uw login sessie niet opgeslagen worden.' });
                break;

            case 'unknown_failure':
                eventHub.$emit('show-alert', { Type: 'danger', Message: 'Uw login verzoek kan op dit moment helaas niet verwerkt worden.' });
                break;

            case 'successOrder':
                eventHub.$emit('show-alert', { Type: 'success', Message: 'Uw bestelling is geplaatst!' });
                break;
        }
    }
});
