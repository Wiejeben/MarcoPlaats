require('./bootstrap');

Vue.component('header-component', require('./components/Header.vue'));
Vue.component('footer-component', require('./components/Footer.vue'));

const app = new Vue({
    el: '#app'
});
