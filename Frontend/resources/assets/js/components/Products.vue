<template>
    <div class="items">
        <h2 class="title text-center">{{ category.Name }}</h2>
        <div class="col-sm-4" v-for="product in products">
            <div class="product-image-wrapper">
                <div class="single-products">
                    <div class="productinfo text-center">
                        <a :href="'/product.html?id=' + product._id">
                            <img v-if="product.Images.length > 0" :src="product.Images[0].Image" alt="">
                            <img v-else src="/images/product-placeholder.jpg" :alt="product.Name" />
                        </a>
                        <h2>€ {{ product.Price }}</h2>
                        <p>{{ product.Name }}</p>
                        <a href="#" @click.prevent="AddToCart(product._id)" class="btn btn-default add-to-cart"><i class="fa fa-shopping-cart"></i>In winkelwagen</a>
                    </div>
                </div>
                <div class="choose">
                    <ul class="nav nav-pills nav-justified">
                        <li>
                            <a v-if="!inWishlist(product._id)" href="#" @click.prevent="InsertWishlist(product._id)" class="change-icon"><i class="fa fa-heart-o"></i><i class="fa fa-heart"></i>Op verlanglijstje</a>
                            <a v-else href="#" @click.prevent="DeleteWishlist(product._id)" class="change-icon"><i class="fa fa-heart"></i><i class="fa fa-heart-o"></i>Van verlanglijstje</a>
                        </li>
                        <!-- <li>
                            <a v-if="!inFavorites(product._id)" href="#" @click.prevent="InsertFavorites(product._id)"><i class="fa fa-star-o"></i>In favorieten</a>
                            <a v-else href="#" @click.prevent="DeleteFavorites(product._id)"><i class="fa fa-star"></i>Uit favorieten</a>
                        </li> -->
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        created() {
            var self = this;
            eventHub.$on('filter-category', this.switchCategory);
            eventHub.$on('filter-price', this.initProducts);
            this.initProducts()
            HasRole('user', function(){
                self.wishlist = window.User.WishlistProductIds;
            })
        },
        data() {
            return {
                category: { Name: 'Alle producten' },
                products: [],
                wishlist: [],
                url: '/products',
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
            AddToCart(productId) {
                if(localStorage["cart"] !== undefined) {
                    var cart = JSON.parse(localStorage["cart"]);
                    if(cart[productId] === undefined){
                        cart[productId] = 1;
                        localStorage.setItem("cart", JSON.stringify(cart));
                        NewAlert('success', 'Product succesvol toegevoegd aan winkelwagen!');
                    } else {
                        cart[productId] += 1;
                        localStorage.setItem("cart", JSON.stringify(cart));
                        NewAlert('success', 'Product succesvol toegevoegd aan winkelwagen!');
                    }
                } else {
                    var cart = {};
                    cart[productId] = 1;
                    localStorage.setItem("cart", JSON.stringify(cart));
                    NewAlert('success', 'Product succesvol toegevoegd aan winkelwagen!');
                }
            },
            inWishlist(id){
                var self = this;
                return self.wishlist.indexOf(id) > -1 ? true : false;
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
                            self.wishlist.push(id);
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
                    url: window.apiUrl + '/users/' + window.User._id + '/wishlist/' + id,
                    type: 'DELETE',
                    success: function(data) {
                        if(data){
                            self.wishlist.splice(self.wishlist.indexOf(id), 1);
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