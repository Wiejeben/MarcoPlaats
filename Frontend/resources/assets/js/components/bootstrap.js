// Global
Vue.component('header-component', require('./Header.vue'));
Vue.component('footer-component', require('./Footer.vue'));

// Products
Vue.component('sidebar-component', require('./Sidebar.vue'));
Vue.component('products-component', require('./Products.vue'));

// Account
Vue.component('account-sidebar-component', require('./account/Sidebar.vue'));
Vue.component('account-profile-component', require('./account/Profile.vue'));
Vue.component('account-wishlist-component', require('./account/Wishlist.vue'));
Vue.component('account-settings-component', require('./account/Settings.vue'));
Vue.component('account-products-component', require('./account/Products.vue'));
Vue.component('account-addproduct-component', require('./account/AddProduct.vue'));

// Cart
Vue.component('cart-overview-component', require('./cart/Overview.vue'));
Vue.component('cart-details-component', require('./cart/Details.vue'));

// Admin
Vue.component('admin-sidebar-component', require('./admin/Sidebar.vue'));
Vue.component('admin-settings-component', require('./admin/Settings.vue'));

Vue.component('admin-products-component', require('./admin/Products.vue'));

Vue.component('admin-categories-component', require('./admin/Categories.vue'));
Vue.component('admin-addcategories-component', require('./admin/AddCategorie.vue'));

Vue.component('admin-users-component', require('./admin/Users.vue'));
Vue.component('admin-users-edit-component', require('./admin/UsersEdit.vue'));

