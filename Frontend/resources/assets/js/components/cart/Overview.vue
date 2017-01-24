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
                                        {{product.Name}}
                                    </a>
                                </h4>
                            </td>
                            <td class="cart_price">
                                <p>&euro;{{product.Price}}</p>
                            </td>
                            <td class="cart_quantity">
                                <div class="cart_quantity_button">
                                    <a class="cart_quantity_down" href="" v-on:click.prevent="RemoveOne(product._id)"> - </a>
                                    <input class="cart_quantity_input" type="text" name="quantity" v-model="amount[product._id]" v-on:change="updateQuantityInput(product._id)" autocomplete="off" size="2" id="quantity" number>
                                    <a class="cart_quantity_up" href="" v-on:click.prevent="AddOne(product._id)"> + </a>
                                </div>
                            </td>
                            <td class="cart_total">
                                <p class="cart_total_price">&euro;{{product.Price * amount[product._id]}}</p>
                            </td>
                            <td class="cart_delete">
                                <a class="cart_quantity_delete" href="" @click.prevent="DeleteFromCart(product._id)"><i class="fa fa-times"></i></a>
                            </td>
                        </tr>
                        <tr>
                            <td>&nbsp;</td>
                            <td><h4>Sub totaal</h4></td>
                            <td colspan="2">&nbsp;</td>
                            <td>&euro;{{sum}}</td>
                        </tr>
                        <tr class="shipping-cost">
                            <td>&nbsp;</td>
                            <td><h4>Bezorg kosten</h4></td>
                            <td colspan="2">&nbsp;</td>
                            <td>Free</td>                                       
                        </tr>
                        <tr>
                            <td>&nbsp;</td>
                            <td><h4>Totaal</h4></td>
                            <td colspan="2">&nbsp;</td>
                            <td><span>&euro;{{sum}}</span></td>
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
                    <a v-else class="btn btn-primary pull-right" href="http://localhost:8080/auth">Bestellen</a>
                </div>
            </div>
        </div><!--/#do_action-->
    </section>
</template>

<script>
    export default {
        mounted() {
            eventHub.$on('user-detected', this.setUser);
            var self = this;
            console.info('Shopping cart ready.');
            if(localStorage["cart"] !== undefined){
                this.amount = JSON.parse(localStorage["cart"]);
                var keys = Object.keys(this.amount)
                for(var i = 0; i < keys.length; i++){
                    $.get(apiUrl + '/products/' + keys[i], function(data) {
                        self.cart.push(data);
                    });
                }
            }
        },
        data() {
            return {
                cart: [],
                amount: [],
                user: null
            }
        },
        computed:{
            sum(){
                var self = this;
                var subTotal = 0;
                    this.cart.forEach(function(product){
                        var price = self.amount[product._id] * parseInt(product.Price);
                        subTotal += price;
                    });
                return subTotal;
            },
            loggedIn() {
                return this.user != null;
            }
        },
        methods:{
            setUser(user) {
                this.user = user;
            },
            updateStorage(){
                localStorage.setItem("cart", JSON.stringify(this.amount));
            },
            updateQuantityInput(productId){
                if(document.getElementById("quantity").value <= 0){
                    delete this.amount[productId];
                    this.cart.splice(this.cart.findIndex(x => x._id==productId), 1);
                    NewAlert('success', 'Product succesvol verwijderd van winkelwagen!');
                }else{
                    this.amount[productId] = document.getElementById("quantity").value
                }
                this.updateStorage();
            },
            DeleteFromCart(productId){
                delete this.amount[productId];
                this.cart.splice(this.cart.findIndex(x => x._id==productId), 1);
                this.updateStorage()
                NewAlert('success', 'Product succesvol verwijderd van winkelwagen!');
            },
            RemoveOne(productId){
                if(this.amount[productId] <= 1){
                    delete this.amount[productId];
                    this.cart.splice(this.cart.findIndex(x => x._id==productId), 1);
                    NewAlert('success', 'Product succesvol verwijderd van winkelwagen!');
                }else{
                    this.amount[productId]--;
                    document.getElementById("quantity").value = this.amount[productId];
                }
                this.updateStorage();
            },
            AddOne(productId){
                this.amount[productId]++;
                document.getElementById("quantity").value = this.amount[productId];
                this.updateStorage();
            }
        }
    }
</script>