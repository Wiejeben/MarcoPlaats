window._ = require('lodash');

window.$ = window.jQuery = require('jquery');
require('bootstrap-sass');

window.Vue = require('vue');
require('vue-resource');

// Handles events
window.eventHub = new Vue();