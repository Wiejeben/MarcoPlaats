require('./bootstrap');

Vue.component('header-component', require('./components/Header.vue'));
Vue.component('footer-component', require('./components/Footer.vue'));
Vue.component('sidebar-component', require('./components/Sidebar.vue'));
Vue.component('products-component', require('./components/Products.vue'));

const app = new Vue({
    el: '#app'
});
