<template>
    <div class="left-sidebar">
        <h2>Menu</h2>
        <div class="panel-group category-products" id="accordian"><!--category-productsr-->
            <div class="panel panel-default" v-for="item in menu">
                <div class="panel-heading">
                    <h4 class="panel-title" v-bind:class="{ 'category-active': item.active }"><a :href="baseUrl+item.url">{{ item.name }}</a></h4>
                </div>
            </div>
        </div><!--/category-productsr-->
    </div>
</template>

<script>
    export default {
        mixins: [require('./../../mixins/auth')],

        data() {
            return {
                baseUrl: '/account',
                url: '/' + window.location.pathname.split('/').pop(),
                menu: [
                    { name: 'Profiel', url: '/', active: false },
                    { name: 'Wishlist', url: '/wishlist.html', active: false },
                    { name: 'Settings', url: '/settings.html', active: false },
                    { name: 'Products', url: '/products.html', active: false }
                ],
            }
        },
        created() {
            var self = this;
            self.menu.forEach(function(item) {
                // console.log(self.url);
                item.active = (item.url == self.url);
            });
        }
    }
</script>