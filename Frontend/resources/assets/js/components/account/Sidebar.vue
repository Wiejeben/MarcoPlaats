<template>
    <div class="left-sidebar">
        <h2>Menu</h2>
        <div class="panel-group category-products" id="accordian"><!--category-productsr-->
            <div class="panel panel-default" v-for="item in menu">
                <div class="panel-heading">
                    <h4 class="panel-title" v-bind:class="{ 'category-active': item.active }"><a href="#">{{ item.name }}</a></h4>
                </div>
            </div>
        </div><!--/category-productsr-->
    </div>
</template>

<script>
    export default {
        data() {
            return {
                url: window.location.pathname.split('/').pop(),
                menu: [
                    { name: 'Profiel', url: 'profile', active: false },
                    { name: 'Settings', url: 'settings', active: false }
                ],
            }
        },
        created() {
            console.log(this.url);
            /*this.menu.forEach(function(item) {
                item.active = (item.url == );
            });*/
        }
    }
</script>