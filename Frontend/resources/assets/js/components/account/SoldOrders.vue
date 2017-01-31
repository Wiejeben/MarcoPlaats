<template>
    <div class="items"><!--features_items-->
        <h2 class="title text-center">Orders</h2>
        <div class="row">
            <div class="col-sm-9">
                <h3>Orders</h3>
            </div>
        </div>
        <div v-if="Orders.length > 0" class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
            <div class="panel panel-default" v-for="(order, index) in Orders">
                <div class="panel-heading" role="tab" :id="'heading-' + index">
                <h4 class="panel-title">
                    <a role="button" data-toggle="collapse" data-parent="#accordion" :href="'#collapse-' + index" aria-expanded="true" :aria-controls="'#collapse-' + index">
                    Order #{{Orders.length - index }} {{ date(Orders.OrderDate) }}
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
                                    <td class="cart_product">
                                        <a href=""><img src="/images/cart/one.png" alt=""></a>
                                    </td>
                                    <td class="cart_description">
                                        <h4><a href="">{{product.product.Name}}</a></h4>
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
        <p>
            U heeft geen orders.
        </p>
    </div>
</template>
<script>
    export default {
        created() {
            self = this;
            HasRole('user', function(){
                $.get(apiUrl + '/users/' + User._id + '/sold', function(orders) {
                    self.Orders = orders;
                });
            })
        },
        data() {
            return {
                Orders: [],
                favorites: []

            }
        },
        methods:{
            moment: function (date) {
                return moment(date);
            },
            date: function (date) {
                return moment(date).format('MMMM Do YYYY, h:mm:ss a');
            }
        },
        filters: {
            moment: function (date) {
                return moment(date).format('MMMM Do YYYY, h:mm:ss a');
            }
        }
    }
</script>