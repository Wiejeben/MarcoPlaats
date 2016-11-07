window._ = require('lodash');

window.$ = window.jQuery = require('jquery');
require('bootstrap-sass');

window.Vue = require('vue');
require('vue-resource');

// Handles events
window.eventHub = new Vue();

window.User = null;

// Generate API url
var location = window.location.hostname;

// if (localStorage.getItem('apiUrl') != null) // You may overwrite the API url by defining a different one in local storage
// {
//     location = localStorage.getItem('apiUrl');
// }

window.apiUrl = 'http://' + 'localhost' + ':8080';

window.LoggedIn = false;
if (typeof(Storage) != "undefined") {
    // Prepare authorization header
    if (localStorage.getItem('authorization') != null)
    {
        $.ajaxSetup({
            headers: {
                'authorization': localStorage.getItem('authorization')
            }
        });

        window.LoggedIn = true;
    }
}