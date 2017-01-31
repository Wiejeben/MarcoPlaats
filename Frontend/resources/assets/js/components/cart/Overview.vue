<template>
    <section id="cart_items">
        <div class="container">
            <div class="breadcrumbs">
                <ol class="breadcrumb">
                  <li><a href="/">Home</a></li>
                  <li class="active">Winkelwagen</li>
                </ol>
            </div>

            <div class="review-payment">
                <h2>Winkelwagen</h2>
            </div>

            <div class="table-responsive cart_info" v-if="cart.length > 0">
                <table class="table table-condensed">
                    <thead>
                        <tr class="cart_menu">
                            <td class="image">Afbeelding</td>
                            <td class="description">Product</td>
                            <td class="price">Prijs</td>
                            <td class="quantity">Aantal</td>
                            <td class="total">Totaal</td>
                            <td class="delete">Verwijderen</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="product in cart" v-bind:id="product._id">
                            <td class="cart_product">
                                <div class="cartOverview img">
                                    <a :href="'/product.html?id=' + product._id">
                                        <img v-if="product.Images.length > 0" :src="product.Images[0].Image" alt="">
                                        <img v-else src="/images/product-placeholder.jpg" :alt="product.Name" />
                                    </a>
                                </div>
                            </td>
                            <td class="cart_description">
                                <h4>
                                    <a :href="'/product.html?id=' + product._id">
                                        {{ product.Name }}
                                    </a>
                                </h4>
                            </td>
                            <td class="cart_price">
                                <p>&euro; {{ product.Price }}</p>
                            </td>
                            <td class="cart_quantity">
                                <div class="cart_quantity_button">
                                    <a class="cart_quantity_down" href="" v-on:click.prevent="RemoveOne(product)"> - </a>
                                    <input class="cart_quantity_input" type="text" name="quantity" v-model="products[product._id]" v-on:change="updateQuantityInput(product)" autocomplete="off" size="2" number>
                                    <a class="cart_quantity_up" href="" v-on:click.prevent="AddOne(product)"> + </a>
                                </div>
                            </td>
                            <td class="cart_total">
                                <p class="cart_total_price">&euro; {{ product.Price * products[product._id] }}</p>
                            </td>
                            <td class="cart_delete">
                                <a class="cart_quantity_delete" href="" @click.prevent="deleteLine(product._id)"><i class="fa fa-times"></i></a>
                            </td>
                        </tr>
                        <tr>
                            <td>&nbsp;</td>
                            <td><h4>Sub totaal</h4></td>
                            <td colspan="2">&nbsp;</td>
                            <td>&euro; {{ sum }}</td>
                        </tr>
                        <tr class="shipping-cost">
                            <td>&nbsp;</td>
                            <td><h4>Bezorg kosten</h4></td>
                            <td colspan="2">&nbsp;</td>
                            <td>Gratis</td>
                        </tr>
                        <tr>
                            <td>&nbsp;</td>
                            <td><h4>Totaal</h4></td>
                            <td colspan="2">&nbsp;</td>
                            <td><span>&euro; {{ sum }}</span></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div v-else>Geen producten in uw winkelwagen.</div>
        </div>

        <div id="do_action">
            <div class="container">
                <a class="btn btn-primary" href="/">Terug</a>
                <div v-if="cart.length > 0">
                    <a v-if="loggedIn" class="btn btn-primary pull-right" href="details.html">Bestellen</a>
                    <a v-else class="btn btn-primary pull-right" :href="apiUrl + '/auth'">Bestellen</a>
                </div>
            </div>
        </div><!--/#do_action-->
    </section>
</template>

<script>
    export default {
        mounted() {
            console.info('Shopping cart ready.');
            var self = this;

            // Get current user
            eventHub.$on('user-detected', this.setUser);

            var products = localStorage.getItem('cart');
            if(products !== null) {
                products = JSON.parse(products);
                var keys = Object.keys(products);

                for(var i = 0; i < keys.length; i++){
                    var productId = keys[i];

                    $.get(apiUrl + '/products/' + productId)
                        .then(data => {
                            self.products = products;
                            self.cart.push(data);
                        })
                        .catch(() => {
                            delete products[productId];
                            localStorage.setItem('cart', JSON.stringify(products))
                        });
                }
            }
        },

        data() {
            return {
                cart: [],
                products: [],
                user: null,
                apiUrl: window.apiUrl
            }
        },

        computed: {
            sum() {
                var self = this;
                var subTotal = 0;
                    this.cart.forEach(function(product){
                        var price = self.products[product._id] * parseInt(product.Price);
                        subTotal += price;
                    });
                return subTotal;
            },
            loggedIn() {
                return this.user != null;
            }
        },

        watch: {
            products: {
                handler(products) {
                    // Update localStorage
                    this.updateStorage(products);
                },
                deep: true
            }
        },

        methods: {
            setUser(user) {
                this.user = user;
            },

            updateStorage(products) {
                localStorage.setItem("cart", JSON.stringify(products))
            },

            updateQuantityInput(product){
                var productId = product._id;
                var line = this.products[productId];

                if (line <= 0) {
                    this.deleteLine(productId);
                } else {
                    this.products[productId] = 1;
                }
            },

            deleteLine(productId) {
                if (confirm("Weet u zeker dat u dit product uit uw winkelmandje wil verwijderen?")) {

                    // Delete from cart list
                    this.cart.splice(this.cart.findIndex(x => x._id==productId), 1);

                    // Delete from localStorage
                    delete this.products[productId];

                    this.updateStorage(this.products);

                    NewAlert('success', 'Product succesvol verwijderd van winkelwagen!');
                }
            },

            RemoveOne(product){
                var productId = product._id;

                if(this.products[productId] <= 1) {
                    this.deleteLine(productId);
                } else {
                    this.products[productId]--;
                }

            },

            AddOne(product){
                var productId = product._id;
                var amount = this.products[productId];

                // Do not increment over the limit
                if (product.Amount >= amount + 1) {
                    this.products[productId]++;
                } else {
                    NewAlert('warning', 'Er zijn niet meer producten voorradig.');
                }
            }
        }
    }
</script>