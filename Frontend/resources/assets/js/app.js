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
                    if(data.Role == 'blocked')
                    {
                        window.LoggedIn = false;
                        localStorage.removeItem('authorization');
                        window.location.href = "/?feedback=blocked";
                    }
                    else
                    {
                        window.User = data;
                        eventHub.$emit('user-detected', data);
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

var feedback = location.search.split('feedback=')[1];

if (typeof feedback != "undefined") {

    if (feedback == 'blocked') {
        eventHub.$emit('show-alert', { Type: 'danger', Message: 'Uw account is geblokkeerd.' });
    }

    if (feedback == 'token_undefined') {
        eventHub.$emit('show-alert', { Type: 'warning', Message: 'Er is helaas iets is gegaan tijdens het inlogproces met Google, probeer het opnieuw.' });
    }

    if (feedback == 'localstorage') {
        eventHub.$emit('show-alert', { Type: 'warning', Message: 'Uw browser ondersteunt geen localStorage, hierdoor kan uw login sessie niet opgeslagen worden.' })
    }

    if (feedback == 'unknown_failure') {
        eventHub.$emit('show-alert', { Type: 'danger', Message: 'Uw login verzoek kan op dit moment helaas niet verwerkt worden.' })
    }
}