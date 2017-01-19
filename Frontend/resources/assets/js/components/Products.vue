<template>
    <div class="items">
        <h2 class="title text-center">{{ category.Name }}</h2>
        <div class="col-sm-4" v-for="product in products">
            <div class="product-image-wrapper">
                <div class="single-products">
                    <div class="productinfo text-center">
                        <a :href="'/product.html?id=' + product._id"><img :src="'http://placeimg.com/200/300/people'" :alt="product.Name" /></a>
                        <h2>€ {{ product.Price }}</h2>
                        <p>{{ product.Name }}</p>
                        <a href="#" @click.prevent="AddToCart(product._id)" class="btn btn-default add-to-cart"><i class="fa fa-shopping-cart"></i>In winkelwagen</a>
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
            eventHub.$on('filter-price', this.initProducts);
            this.initProducts();
        },

        data() {
            return {
                category: { Name: 'Alle producten' },
                products: [
                ],
                url: '/products'
            }
        },

        methods: {
            initProducts(){
                var self = this;
                self.greatestPrice = 0;
                
                $.ajax({
                    url: window.apiUrl + self.url,
                    type: 'GET',
                    data: {
                        minPrice: localStorage.getItem('minProductPrice'),
                        maxPrice: localStorage.getItem('maxProductPrice')
                    },
                    success: function(products){
                        if(products.Products){
                            self.products = products.Products
                        }else{
                            self.products = products
                        }
                        for (var i = 0; i < self.products.length; i++) {
                            if(self.products[i].Price > self.greatestPrice){
                                self.greatestPrice = self.products[i].Price;
                            }
                        }
                        if(self.greatestPrice > 0){                
                            self.updateGreatestPrice();
                        }
                    },
                    error: () => {
                        self.products = null
                    }
                });
            },
            switchCategory(category) {
                var self = this;
                this.category = category;
                self.url = '/categories/' + category._id
                this.initProducts();
            },
            AddToCart(productId){
                if(localStorage["cart"]){
                    var cart = JSON.parse(localStorage["cart"]);
                    if(cart[productId] === undefined){
                        cart[productId] = 1;
                        localStorage.setItem("cart", JSON.stringify(cart));
                        NewAlert('success', 'Product succesvol toegevoegd aan winkelwagen!');
                    }else{
                        cart[productId] += 1;
                        localStorage.setItem("cart", JSON.stringify(cart));
                        NewAlert('success', 'Product succesvol toegevoegd aan winkelwagen!');
                    }
                }else{
                    var cart = {};
                    cart[productId] = 1;
                    localStorage.setItem("cart", JSON.stringify(cart));
                    NewAlert('success', 'Product succesvol toegevoegd aan winkelwagen!');
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