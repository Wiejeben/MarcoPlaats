require('./bootstrap');

Vue.component('header-component', require('./components/Header.vue'));
Vue.component('footer-component', require('./components/Footer.vue'));
Vue.component('sidebar-component', require('./components/Sidebar.vue'));
Vue.component('products-component', require('./components/Products.vue'));

Vue.component('account-sidebar-component', require('./components/account/Sidebar.vue'));
Vue.component('account-profile-component', require('./components/account/Profile.vue'));
Vue.component('account-wishlist-component', require('./components/account/Wishlist.vue'));
Vue.component('account-settings-component', require('./components/account/Settings.vue'));

Vue.component('cart-overview-component', require('./components/cart/Overview.vue'));
Vue.component('cart-details-component', require('./components/cart/Details.vue'));

window.apiUrl = 'http://146.185.176.116:8080';

const app = new Vue({
    el: '#app',
    // mixins: [require('./mixins/auth')],

    created() {

        $.ajaxSetup({
            headers: {
                'authorization': localStorage.getItem('authorization')
            },
        });

        $.get('http://marcoplaats.dev:8080/auth/user', function(data) {
            "use strict";

            console.log(data);
        });

        if (typeof(Storage) != "undefined") {
            // Prepare authorization header
            // Vue.http.headers.common['authorization'] = localStorage.getItem('authorization');
        }
    }
});
