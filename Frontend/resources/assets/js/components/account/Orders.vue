<template>
    <div class="items"><!--features_items-->
        <h2 class="title text-center">Orders</h2>
        <div class="row">
            <div class="col-sm-9">
                <h3>Orders</h3>
            </div>
        </div>
        <div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
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
        <!--<div class="table-responsive">
            <table class="table table-condensed">
                <thead>
                    <tr>
                        <th>Order number</th>
                        <th>Amount</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody v-for="(order, index) in Orders">
                    <tr data-toggle="collapse" :data-target="'#demo-' + index" class="accordion-toggle">
                        <td>{{ index + 1 }}</td>
                        <td>{{ order.Amount }}</td>
                        <td>{{ order.TotalPrice }}</td>
                    </tr>
                    <tr>
                        <td colspan="6" class="hiddenRow">
                            <div class="accordion-body collapse" :id="'#demo-' + index">Demo1</div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>-->
        
    </div>
    
</template>


<!--
<div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
  <div class="panel panel-default">
    <div class="panel-heading" role="tab" id="headingOne">
      <h4 class="panel-title">
        <a role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
          Collapsible Group Item #1
        </a>
      </h4>
    </div>
    <div id="collapseOne" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingOne">
      <div class="panel-body">
        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
      </div>
    </div>
  </div>-->

<script>
    export default {
        created() {
            self = this;
            HasRole('user', function(){
                $.get(apiUrl + '/users/' + User._id + '/orders', function(orders) {
                    self.Orders = orders;
                });
            })
        },
        data() {
            return {
                Orders: []
            }
        },
        methods:{
        }
    }
</script>