<template>
    <div>
        <div v-if="product !== false">
            <div class="product-details"><!--product-details-->
                <div class="col-sm-3">
                    <div class="view-product">
                        <img v-if="product.Images.length > 0" :src="product.Images[0].Image" :alt="product.Name">
                        <img v-else src="/images/product-placeholder.jpg" :alt="product.Name" />
                    </div>
                </div>
                <div class="col-sm-9">
                    <div class="product-information"><!--/product-information-->
                        <h2>{{ product.Name }}</h2>
                        <div v-if="product.DeletedAt == null">
                            <p><b>Aantal:</b> {{ product.Amount }}</p>
                            <a :href="'/profile.html?id=' + product.SellerID"><p>Verkoper</p></a>
                        </div>
                        <span>
                            <span>&euro; {{ product.Price }},-</span>
                            <div v-if="product.DeletedAt == null">
                                <button v-if="product.Amount > 0" type="button" @click.prevent="AddToCart()" class="btn btn-fefault cart">
                                    <i class="fa fa-shopping-cart"></i>
                                    In winkelwagen
                                </button>
                                <button v-else type="button" onclick="return false" class="btn btn-fefault cart">
                                    <i class="fa fa-close"></i>
                                    Uitverkocht
                                </button>
                            </div>
                        </span>
                    </div><!--/product-information-->
                </div>
            </div><!--/product-details-->

            <div class="category-tab shop-details-tab"><!--category-tab-->
                <div class="col-sm-12">
                    <ul class="nav nav-tabs">
                        <li class="active"><a href="#details" data-toggle="tab">Omschrijving</a></li>
                    </ul>
                </div>
                <div class="tab-content container">
                    <div class="tab-pane fade active in" id="details" >
                        <p>{{ product.Description }}</p>
                    </div>
                </div>
            </div><!--/category-tab-->
        </div>
        <div v-else>
            <div v-if="product === null">
                <h2>Bezig met laden</h2>
            </div>
            <div v-else>
                <h2>404 product niet gevonden</h2>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        created() {
            var self = this
            var id = location.search.split('id=')[1];

            $.get(apiUrl + '/products/' + id, function(product) {
                self.product = product;
            })
            .fail(function() {
                NewAlert('error', 'Er is iets fout gegaan!');
            });
        },

        data() {
            return {
                product: false,
                cart: {}
            }
        },
        methods:{
            AddToCart() {
                var self = this;
                var productId = self.product._id;
                if(localStorage["cart"] !== undefined) {
                    self.cart = JSON.parse(localStorage["cart"]);
                    if(self.cart[productId] === undefined){
                        self.cart[productId] = 1;
                        NewAlert('success', 'Product succesvol toegevoegd aan winkelwagen!');
                    } else {
                        var amount = self.cart[productId];

                        // Do not increment over the limit
                        if (self.product.Amount >= amount + 1) {
                            self.cart[productId]++;
                            NewAlert('success', 'Product succesvol toegevoegd aan winkelwagen!');
                        } else {
                            NewAlert('warning', 'Er zijn niet meer producten voorradig.');
                        }
                    }
                } else {
                    self.cart[productId] = 1;
                    NewAlert('success', 'Product succesvol toegevoegd aan winkelwagen!');
                }
                localStorage.setItem("cart", JSON.stringify(self.cart));
            }
        }
    }
</script>
