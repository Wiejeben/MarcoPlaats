<template>
        <section v-if="cart.length > 0" id="cart_items">
        <div class="container">
            <div class="breadcrumbs">
                <ol class="breadcrumb">
                  <li><a href="/">Home</a></li>
                  <li><a href="/cart/">Winkelwagen</a></li>
                  <li class="active">Details</li>
                </ol>
            </div><!--/breadcrums-->

            <div class="step-one">
                <h2 class="heading">Stap 1</h2>
            </div>
            
            <div class="review-payment">
                <h2>Details</h2>
            </div>

            <div class="shopper-informations">
                <div class="row">
                    <div class="col-sm-3">
                        <div class="shopper-info">
                            <p>Accountgegevens</p>
                        </div>
                    </div>
                    <div v-if="user != null" class="col-sm-5 clearfix">
                        <div class="bill-to">
                            <p>Persoonsgegevens</p>
                            <div class="form-one">
                                <form>
                                    <input type="text" placeholder="Voornaam" v-model="user.FirstName">
                                    <input type="text" placeholder="Achternaam" v-model="user.LastName">
                                    <input type="text" placeholder="Email" v-model="user.Email">
                                    <input type="text" placeholder="Telefoonnummer" v-model="user.PhoneNumber">
                                </form>
                            </div>
                            <div class="form-two">
                                <form>
                                    <input type="text" placeholder="Adres" v-model="user.MainAddress.Address">
                                    <input type="text" placeholder="Postcode" v-model="user.MainAddress.Zipcode">
                                    <input type="text" placeholder="Plaats" v-model="user.MainAddress.City">
                                    <input type="text" placeholder="Alternatief Adres" v-model="user.DeliveryAddress.Address">
                                    <input type="text" placeholder="Alternatieve Postcode" v-model="user.DeliveryAddress.Zipcode">
                                    <input type="text" placeholder="Alternatieve Plaats" v-model="user.DeliveryAddress.City">
                                </form>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-4">
                        <div class="order-message">
                            <p>Extra informatie</p>
                            <textarea name="message" id="messageArea" v-on:change="SaveMessage()" :value="this.messageAreaText" placeholder="Speciale notities met betrekking tot de bestelling." rows="9"></textarea>
                            <label><input type="checkbox"> Gebruik het alternatief adres als bezorg adres.</label>
                        </div>  
                    </div>                  
                </div>
            </div>
        </div>
        <div id="do_action">
            <div class="container">
                <a class="btn btn-primary" href="/cart/">Terug</a>
                <a class="btn btn-primary pull-right" @click="UpdateShoppingUser()">Betaling</a>
            </div>
        </div><!--/#do_action-->
    </section> <!--/#cart_items-->
</template>
<script>
    export default {
        mounted() {
            eventHub.$on('user-detected', this.setUser);
            if(localStorage["messageArea"]){
                this.messageAreaText = JSON.parse(localStorage["messageArea"]);
            }
        },
        data() {
            return {
                user: null,
                messageAreaText: null,
                cart: JSON.parse(localStorage["cart"])
            }
        },
        methods:{
            setUser(user) {
                this.user = user;
            },
            UpdateShoppingUser(){
                var self = this;
                $.ajax({
                    url: window.apiUrl + '/users/' + User._id,
                    type: 'PUT',
                    contentType: 'application/json',
                    data: JSON.stringify(this.user),
                    dataType: 'json',
                    success: function(data, status, jqXHR) {
                        if(jqXHR.status == 204){
                            NewAlert('success', 'Uw instellingen zijn succesvol aangepast!');
                            window.location.href="/cart/confirmation.html";
                        } else {
                            NewAlert('error', 'Er is iets fout gegaan');
                        }
                    }
                });
            },
            SaveMessage(){
                if(localStorage["messageArea"]){
                    var messageArea = JSON.parse(localStorage["messageArea"]);
                    messageArea = document.getElementById("messageArea").value;
                    localStorage.setItem("messageArea", JSON.stringify(messageArea));
                }else{
                    var messageArea = document.getElementById("messageArea").value;
                    localStorage.setItem("messageArea", JSON.stringify(messageArea));
                }
            }
        }
    }
</script>