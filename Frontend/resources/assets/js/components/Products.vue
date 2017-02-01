<template>
    <div class="items">
        <h2 class="title text-center">{{ category.Name }}</h2>
        <div v-if="ajaxLoaded">
            <div class="col-sm-4" v-for="product in products" v-if="product.DeletedAt == null">
                <div class="product-image-wrapper">
                    <div class="bgimg">
                        <div class="productinfo text-center">
                            <a :href="'/product.html?id=' + product._id">
                                <img v-if="product.Images.length > 0" :src="product.Images[0].Image" alt="">
                                <img v-else src="/images/product-placeholder.jpg" :alt="product.Name" />
                            </a>
                            <h2>&euro; {{ product.Price }}</h2>
                            <p>{{ product.Name }}</p>
                            <a v-if="product.Amount > 0" href="#" @click.prevent="AddToCart(product)" class="btn btn-default add-to-cart"><i class="fa fa-shopping-cart"></i>In winkelwagen</a>
                            <a v-else href="#" onclick="return false" class="btn btn-default add-to-cart"><i class="fa fa-close"></i>Uitverkocht</a>
                        </div>
                    </div>
                    <div class="choose">
                        <ul class="nav nav-pills nav-justified">
                            <li>
                                <a v-if="!inWishlist(product._id)" href="#" @click.prevent="InsertWishlist(product._id)" class="change-icon"><i class="fa fa-heart-o"></i><i class="fa fa-heart"></i>Op verlanglijstje</a>
                                <a v-else href="#" @click.prevent="DeleteWishlist(product._id)" class="change-icon"><i class="fa fa-heart"></i><i class="fa fa-heart-o"></i>Van verlanglijstje</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div v-else class="text-center">
            <img src="/images/loading.gif" alt="">
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
            
            eventHub.$once('user-detected', function() {
                self.wishlist = window.User.WishlistProductIds;
            })
        },
        data() {
            return {
                category: { Name: 'Alle producten' },
                products: [],
                wishlist: [],
                url: '/products',
                ajaxLoaded: false,
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
                    success(products) {
                        if (products.Products) {
                            self.products = products.Products
                        } else {
                            self.products = products
                        }
                        self.ajaxLoaded = true
                    },
                    error: () => {
                        self.products = []
                    }
                });
            },
            switchCategory(category) {
                var self = this;
                this.category = category;
                self.url = '/categories/' + category._id
                this.initProducts()
            },
            AddToCart(product) {
                var productId = product._id;

                if(localStorage["cart"] !== undefined) {
                    var cart = JSON.parse(localStorage["cart"]);

                    if(cart[productId] === undefined){
                        cart[productId] = 1;
                        localStorage.setItem("cart", JSON.stringify(cart));
                        NewAlert('success', 'Het product is succesvol toegevoegd aan de winkelwagen!');
                    } else {

                        var amount = cart[productId];

                        // Do not increment over the limit
                        if (product.Amount >= amount + 1) {
                            cart[productId]++;

                            localStorage.setItem("cart", JSON.stringify(cart));
                            NewAlert('success', 'Het product is succesvol toegevoegd aan de winkelwagen!');
                        } else {
                            NewAlert('warning', 'Er zijn niet meer producten beschikbaar.');
                        }
                    }
                } else {
                    var cart = {};
                    cart[productId] = 1;
                    localStorage.setItem("cart", JSON.stringify(cart));
                    NewAlert('success', 'Het product is succesvol toegevoegd aan de winkelwagen!');
                }
            },
            inWishlist(id){
                return this.wishlist.indexOf(id) > -1 ? true : false;
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
                            NewAlert('success', 'Product succesvol toegevoegd aan jouw verlanglijstje!');
                        } else {
                            NewAlert('error', 'Er is iets mis gegaan.');
                        }
                    }
                });
            },          
            DeleteWishlist(id) {
                var self = this;
                $.ajax({
                    url: window.apiUrl + '/users/' + window.User._id + '/wishlist/' + id,
                    type: 'DELETE',
                    contentType: 'appslication/json',
                    dataType: 'json',
                    success: function(data) {
                        if(data){
                            self.wishlist.splice(self.wishlist.indexOf(id), 1);
                            NewAlert('success', 'Product succesvol verwijderd van jouw verlanglijstje!');
                        } else {
                            NewAlert('error', 'Er is iets fout gegaan');
                        }
                    }
                });
            }
        }
    }
</script>