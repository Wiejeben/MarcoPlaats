<template>
    <div class="items"><!--features_items-->
        <h2 class="title text-center">Producten {{ category.name }}</h2>

        <div class="col-sm-4" v-for="product in products">
            <div class="product-image-wrapper">
                <div class="single-products">
                    <div class="productinfo text-center">
                        <img :src="'/images/shop/product8.jpg'" :alt="product.name" />
                        <h2>€ {{ product.Price }}</h2>
                        <p>{{ product.Name }}</p>
                        <a href="#" class="btn btn-default add-to-cart"><i class="fa fa-shopping-cart"></i>In winkelwagen</a>
                    </div>
                </div>
                <div class="choose">
                    <ul class="nav nav-pills nav-justified">
                        <li><a href="#" @click.prevent="InsertWishlist(product._id)"><i class="fa fa-heart"></i>Op verlanglijstje</a></li>
                    </ul>
                </div>
            </div>
        </div>
    </div><!--features_items-->
</template>

<script>
    export default {
        created() {
            eventHub.$on('filter-category', this.switchCategory);
            var self = this;
            $.get(apiUrl + '/products', function(products) {
                self.products = products;
            });
        },

        mounted() {
            console.info('Products ready.')
        },

        data() {
            return {
                category: { name: 'Alles' },

                products: [
                    // { name: 'Easy Polo Black Edition', price: 56, image: 'product7.jpg' },
                    // { name: 'Easy Polo Black Edition', price: 56, image: 'product8.jpg' },
                    // { name: 'Easy Polo Black Edition', price: 56, image: 'product9.jpg' },
                    // { name: 'Easy Polo Black Edition', price: 56, image: 'product10.jpg' },
                    // { name: 'Easy Polo Black Edition', price: 56, image: 'product11.jpg' },
                    // { name: 'Easy Polo Black Edition', price: 56, image: 'product12.jpg' }
                ]
            }
        },

        methods: {
            switchCategory(category) {
                this.category = category;
            },

            InsertWishlist(id) {
                var self = this;
                $.ajax({
                    url: window.apiUrl+'/users/' + window.User._id + '/wishlist',
                    type: 'POST',
                    contentType: 'application/json',
                    data: JSON.stringify({ ProductId: id }),
                    dataType: 'Json',
                    success: function(data) {
                        if(data == true){
                            self.newAlert('success', 'Product succesvol toegevoegd aan verlanglijstje!');
                        } else {
                            self.newAlert('error', 'Er is iets fout gegaan');
                        }
                    }
                });
            },
            
            DeleteWishlist(id) {
                var self = this;
                $.ajax({
                    url: window.apiUrl+'/users/'+window.User._id + '/wishlist/' + id,
                    type: 'DELETE',
                    success: function(data) {
                        if(data == true){
                            self.newAlert('success', 'Product succesvol verwijdert van verlanglijstje!');
                        } else {
                            self.newAlert('error', 'Er is iets fout gegaan');
                        }
                    }
                });
            }
        }
    }
</script>