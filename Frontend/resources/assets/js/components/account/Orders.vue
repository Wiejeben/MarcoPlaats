<template>
    <div class="items"><!--features_items-->
        <h2 class="title text-center">Bestellingen</h2>
        <div class="row">
            <div class="col-sm-9">
                <h3>Bestellingen</h3>
            </div>
        </div>
        <div v-if="Orders.length > 0" class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
            <div class="panel panel-default" v-for="(order, index) in Orders">
                <div class="panel-heading" role="tab" :id="'heading-' + index">
                <h4 class="panel-title">
                    <a role="button" data-toggle="collapse" data-parent="#accordion" :href="'#collapse-' + index" aria-expanded="true" :aria-controls="'#collapse-' + index">
                    Order #{{Orders.length - index }}
                    </a>
                    <span class="pull-right">€ {{ order.TotalPrice }}</span>
                </h4>
                </div>
                <div :id="'collapse-' + index" class="panel-collapse collapse panel-heading" role="tabpanel" aria-labelledby="headingOne">
                <div class="panel-body">
                    <div class="table-responsive cart_info">
                        <table class="table table-condensed">
                            <thead>
                                <tr class="cart_menu">
                                    <td></td>
                                    <td class="image">Afbeelding</td>
                                    <td class="description">Product</td>
                                    <td class="price">Prijs</td>
                                    <td class="quantity">Aantal</td>
                                    <td class="total">Totaal</td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="product in order.Products">
                                    <td>
                                        <a v-if="!inFavorites(product.product._id)" href="#" @click.prevent="InsertFavorites(product.product._id)"><i class="fa fa-star-o"></i></a>
                                        <a v-else href="#" @click.prevent="DeleteFavorites(product.product._id)"><i class="fa fa-star"></i></a>
                                    </td>
                                    <td class="cart_product">
                                        <a :href="'/product.html?id=' + product.product._id"><img src="/images/cart/one.png" alt=""></a>
                                    </td>
                                    <td class="cart_description">
                                        <h4><a :href="'/product.html?id=' + product.product._id">{{product.product.Name}}</a></h4>
                                    </td>
                                    <td class="cart_price">
                                        <p>{{product.basePrice}}</p>
                                    </td>
                                    <td class="cart_quantity">
                                        <p>{{product.amount}}</p>
                                    </td>
                                    <td class="cart_total">
                                        <p class="cart_total_price">{{product.totalPrice}}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td>&nbsp;</td>
                                    <td><h4>Cart Sub Total</h4></td>
                                    <td colspan="2">&nbsp;</td>
                                    <td>{{order.TotalPrice}}</td>
                                </tr>
                                <tr class="shipping-cost">
                                    <td>&nbsp;</td>
                                    <td><h4>Shipping Cost</h4></td>
                                    <td colspan="2">&nbsp;</td>
                                    <td>Free</td>										
                                </tr>
                                <tr>
                                    <td>&nbsp;</td>
                                    <td><h4>Total</h4></td>
                                    <td colspan="2">&nbsp;</td>
                                    <td><span>{{order.TotalPrice}}</span></td>
                                </tr>					
                            </tbody>
                        </table>
                    </div>
                </div>
                </div>
            </div>
        </div>
        <div v-else>
            <p>
                U heeft geen orders.
            </p>
        </div>
    </div>
</template>
<script>
    export default {
        created() {
            self = this;
            HasRole('user', function(){
                $.get(apiUrl + '/users/' + User._id + '/orders', function(orders) {
                    self.Orders = orders;
                });

                self.favorites = User.FavoriteProductIds;
            })
        },
        data() {
            return {
                Orders: [],
                favorites: []

            }
        },
        methods:{
            inFavorites(id){
                var self = this;
                return self.favorites.indexOf(id) > -1 ? true : false;
            },
            InsertFavorites(id) {
                var self = this;
                $.ajax({
                    url: window.apiUrl+'/users/' + window.User._id + '/favorites',
                    type: 'POST',
                    contentType: 'application/json',
                    data: JSON.stringify({ ProductId: id }),
                    dataType: 'Json',
                    success: function(data) {
                        if(data){
                            self.favorites.push(id);
                            NewAlert('success', 'Het product succesvol toegevoegd aan uw favorieten!');
                        } else {
                            NewAlert('error', 'Er is iets fout gegaan');
                        }
                    }
                });
            },
            DeleteFavorites(id) {
                var self = this;
                $.ajax({
                    url: window.apiUrl+'/users/'+window.User._id + '/favorites/' + id,
                    type: 'DELETE',
                    contentType: 'application/json',
                    data: JSON.stringify({ ProductId: id }),
                    dataType: 'Json',
                    success: function(data) {
                        if(data){
                            self.favorites.splice(self.favorites.indexOf(id), 1);
                            NewAlert('success', 'Het product succesvol verwijderd uit uw favorieten!');
                        } else {
                            NewAlert('error', 'Er is iets mis gegaan.');
                        }
                    }
                });
            }
        }
    }
</script>