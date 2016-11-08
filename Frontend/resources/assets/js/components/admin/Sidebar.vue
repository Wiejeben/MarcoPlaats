<template>
    <div class="left-sidebar">
        <h2>Menu</h2>
        <div class="panel-group category-products" id="accordian"><!--category-productsr-->
            <div class="panel panel-default" v-for="item in menu">
                <div class="panel-heading">
                    <h4 class="panel-title" v-bind:class="{ 'category-active': item.active }"><a :href="baseUrl + item.url">{{ item.name }}</a></h4>
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
                baseUrl: '/admin',
                url: '/' + window.location.pathname.split('/').filter(n => n)[1] + '/',
                menu: [
                    { name: 'Gebruikers', url: '/', active: false },
                    { name: 'Producten', url: '/products/', active: false },
                    { name: 'Categorieën', url: '/categories/', active: false },
                    { name: 'Instellingen', url: '/settings.html', active: false }
                ],
            }
        },
        created() {
            console.log(this.url);
            var self = this;
            self.menu.forEach(function(item) {
                item.active = (item.url == ((self.url == '/undefined/' || self.url == '/users/') ? '/' : self.url));
            });
        }
    }
</script>