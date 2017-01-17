<template>
    <div class="items">
        {{ greatestPrice }}
        <h2 class="title text-center">{{ category.Name }}</h2>
        <div class="col-sm-4" v-for="product in products">
            <div class="product-image-wrapper">
                <div class="single-products">
                    <div class="productinfo text-center">
                        <a :href="'/product.html?id=' + product._id"><img :src="'http://lorempixel.com/200/300/'" :alt="product.Name" /></a>
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
    </div>
</template>

<script>
    export default {
        created() {
            eventHub.$on('filter-category', this.switchCategory);
            eventHub.$on('filter-price', this.filterPrice);
            this.initProducts();
        },

        data() {
            return {
                category: { Name: 'Alle producten' },
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
            filterPrice() {
                this.initProducts();
            },
            initProducts(){
                var self = this;
                self.greatestPrice = 0;
                self.url = '/products';
                if (localStorage.getItem('minProductPrice') !== null && localStorage.getItem('maxProductPrice') !== null) {
                    self.url += '?minPrice='+localStorage.getItem('minProductPrice')+'&maxPrice'+localStorage.getItem('maxProductPrice');
                }
                $.get(apiUrl + self.url, function(products) {
                    self.products = products;
                    for (var i = 0; i < self.products.length; i++) {
                        if(self.products[i].Price > self.greatestPrice){
                            self.greatestPrice = self.products[i].Price;
                        }
                    }
                    if(self.greatestPrice > 0){                
                        self.updateGreatestPrice();
                    }
                });
            },
            switchCategory(category) {
                var self = this;
                this.category = category;
                
                $.get(apiUrl + '/categories/' + category._id, function(response) {
                    self.products = response.Products;
                }); 

            },
            updateGreatestPrice(){
                var self = this;
                localStorage.setItem('GreatestProductPrice', self.greatestPrice);
                if (localStorage.getItem('minProductPrice') === null || parseInt(localStorage.getItem('minProductPrice')) > self.greatestPrice) {
                    localStorage.setItem('minProductPrice', 0); 
                }
                if (localStorage.getItem('maxProductPrice') === null || parseInt(localStorage.getItem('maxProductPrice')) > self.greatestPrice) {
                    localStorage.setItem('maxProductPrice', self.greatestPrice);
                }
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
                        if(data){
                            NewAlert('success', 'Product succesvol toegevoegd aan verlanglijstje!');
                        } else {
                            NewAlert('error', 'Er is iets fout gegaan');
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
                        if(data){
                            NewAlert('success', 'Product succesvol verwijdert van verlanglijstje!');
                        } else {
                            NewAlert('error', 'Er is iets fout gegaan');
                        }
                    }
                });
            }
        }
    }
</script>