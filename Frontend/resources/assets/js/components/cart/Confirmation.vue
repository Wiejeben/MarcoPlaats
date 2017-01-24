<template>
    <section v-if="cart.length > 0" id="cart_items">
		<div class="container">
			<div class="breadcrumbs">
				<ol class="breadcrumb">
				  <li><a href="/">Home</a></li>
                  <li><a href="/cart/">Winkelwagen</a></li>
                  <li><a href="/cart/details.html">Details</a>
                  <li class="active">Bevestiging</li>
				</ol>
			</div><!--/breadcrums-->

			<div class="step-one">
				<h2 class="heading">Stap 2</h2>
			</div>

			<div class="review-payment">
				<h2>Bevestiging</h2>
			</div>
            <div v-if="this.user != null" class="row">
                <div class="col-sm-3">
                    <table>
                        <tbody> 
                            <tr>
                                <th><h5>Persoonsgegevens</h5></th>
                            </tr>
                            <tr>
                                <th>Naam:</th>
                                <td>{{this.user.FirstName}}</td>
                            </tr>
                            <tr>
                                <th>Achternaam:</th>
                                <td>{{this.user.LastName}}</td>
                            </tr>
                            <tr>
                                <th>Email:</th>
                                <td>{{this.user.Email}}</td>
                            </tr>
                            <tr>
                                <th>Telefoonnummer:</th>
                                <td>{{this.user.PhoneNumber}}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="col-sm-3">
                    <table>
                        <tbody>
                            <tr>
                                <th><h5>Adresgegevens</h5></th>
                            </tr>
                            <tr>
                                <th>Adres:</th>
                                <td>{{this.user.MainAddress.Address}}</td>
                            </tr>
                            <tr>
                                <th>Postcode:</th>
                                <td>{{this.user.MainAddress.Zipcode}}</td>
                            </tr>
                            <tr>
                                <th>Plaats:</th>
                                <td>{{this.user.MainAddress.City}}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div v-if="alternativeAddress" class="col-sm-3">
                    <table>
                        <tbody>
                            <tr>
                                <th><h5>Bezorgadres</h5></th>
                            </tr>
                            <tr>
                                <th>Adres:</th>
                                <td>{{this.user.DeliveryAddress.Address}}</td>
                            </tr>
                            <tr>
                                <th>Postcode:</th>
                                <td>{{this.user.DeliveryAddress.Zipcode}}</td>
                            </tr>
                            <tr>
                                <th>Plaats:</th>
                                <td>{{this.user.DeliveryAddress.City}}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div v-else class="col-sm-3">
                    <table>
                        <tbody>
                            <tr>
                                <th><h5>Bezorgadres</h5></th>
                            </tr>
                            <tr>
                                <th>Adres:</th>
                                <td>{{this.user.MainAddress.Address}}</td>
                            </tr>
                            <tr>
                                <th>Postcode:</th>
                                <td>{{this.user.MainAddress.Zipcode}}</td>
                            </tr>
                            <tr>
                                <th>Plaats:</th>
                                <td>{{this.user.MainAddress.City}}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="col-sm-3">
                    <table>
                        <tbody>
                            <tr>
                                <th><h5>Bezorg notitie</h5></th>
                            </tr>
                            <tr>
                                <th>Notitie:</th>
                                <td>{{this.messageAreaText}}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div>&nbsp;</div>
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
						<tr v-for="product in cart">
                            <td class="cart_product">
                                <div class="cartOverview img">
                                    <a :href="'/product.html?id=' + product._id">
                                        <img v-if="product.Images.length > 0" :src="product.Images[0].Image" alt="">
                                        <img v-else src="/images/product-placeholder.jpg" :alt="product.Name" />
                                    </a>
                                </div>
                            </td>
                            <td class="cart_description">
                                <h4><a href="">{{product.Name}}</a></h4>
                            </td>
                            <td class="cart_price">
                                <p>{{product.Price}}</p>
                            </td>
							<td class="cart_quantity">
                                <p>{{amount[product._id]}}</p>
                            </td>
							<td class="cart_total">
								<p class="cart_total_price">{{product.Price * amount[product._id]}}</p>
							</td>
						</tr>
						<tr>
							<td>&nbsp;</td>
							<td><h4>Cart Sub Total</h4></td>
							<td colspan="2">&nbsp;</td>
                            <td>{{sum}}</td>
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
                            <td><span>{{sum}}</span></td>
						</tr>					
					</tbody>
				</table>
			</div>
		</div>
        <div id="do_action">
            <div class="container">
                <a class="btn btn-primary" href="">Terug</a>
                <a class="btn btn-primary pull-right" @click.prevent="PlaceOrder()" href="#">Plaats bestelling</a>
            </div><!--/#do_action-->
        </div>
	</section> <!--/#cart_items-->
</template>
<script>
    export default {
        mounted() {
            eventHub.$on('user-detected', this.setUser);
            var self = this;
            if(localStorage["cart"]){
                this.amount = JSON.parse(localStorage["cart"])
                var keys = Object.keys(this.amount)

                for(var i = 0; i < keys.length; i++){
                    self.Order.OrderLines.push( { ProductId: keys[i],  Amount:self.amount[keys[i]] } );
                    $.get(apiUrl + '/products/' + keys[i], function(data) {
                        self.cart.push(data);
                    });
                }
            }
           
            if(localStorage["messageArea"]){
                this.messageAreaText = JSON.parse(localStorage["messageArea"]);
            }else{
                this.messageAreaText = "Geen";
            }

            if(localStorage["AlternativeAddress"]){
                this.alternativeAddress = JSON.parse(localStorage["AlternativeAddress"]);
            }
        },
        data() {
            return {
                cart: [],
                user: null,
                amount: [],
                messageAreaText: null,
                Order: {
                    OrderLines: [],
                    Address: {
                        Address: '',
                        City: '',
                        Zipcode: '',
                    }
                },
                alternativeAddress: false
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
            }
        },
        methods:{
            setUser(user) {
                this.user = user
                if(this.alternativeAddress){
                    this.Order.Address = this.user.DeliveryAddress
                }else{
                    this.Order.Address = this.user.MainAddress
                }
            },
            PlaceOrder() {
                var self = this
                $.ajax({
                    url: window.apiUrl+'/orders',
                    type: 'POST',
                    contentType: 'application/json',
                    data: JSON.stringify(self.Order),
                    dataType: 'Json',
                    success: function(data) {
                        if(data){
                            localStorage.removeItem("cart");
                            localStorage.removeItem("messageArea");
                            window.location.replace('/?feedback=successOrder');
                        } else {
                            NewAlert('error', 'Er is iets fout gegaan');
                        }
                    }
                });
            }
        }
    }
</script>