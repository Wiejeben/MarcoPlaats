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

if (localStorage.getItem('apiUrl') != null) { // You may overwrite the API url by defining a different one in local storage
    location = localStorage.getItem('apiUrl');
}

window.apiUrl = 'http://' + location + ':8080';

window.LoggedIn = false;

$.get(window.apiUrl, function(data) {
    console.log("Connection to api is OK!"); 
}).fail(function() {
    $(".messages").append("<div class='alert alert-danger fade in'><a href='#' class='close' data-dismiss='alert'>&times;</a>Kan geen verbinding maken met de api.</div>");
    console.log("Couldn't connect to api");
});

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