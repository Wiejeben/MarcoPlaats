require('./bootstrap');

Vue.component('header-component', require('./components/Header.vue'));
Vue.component('footer-component', require('./components/Footer.vue'));
Vue.component('sidebar-component', require('./components/Sidebar.vue'));
Vue.component('products-component', require('./components/Products.vue'));

Vue.component('account-sidebar-component', require('./components/account/Sidebar.vue'));
Vue.component('account-profile-component', require('./components/account/Profile.vue'));
Vue.component('account-settings-component', require('./components/account/Settings.vue'));

Vue.component('cart-overview-component', require('./components/cart/Overview.vue'));
Vue.component('cart-details-component', require('./components/cart/Details.vue'));

const app = new Vue({
    el: '#app'
});
