<template>
        <section id="cart_items">
        <div class="container">
            <div class="breadcrumbs">
                <ol class="breadcrumb">
                  <li><a href="#">Home</a></li>
                  <li><a href="#">Overzicht</a></li>
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
                    <div class="col-sm-5 clearfix">
                        <div class="bill-to">
                            <p>Persoonsgegevens</p>
                            <div class="form-one">
                                <form>
                                    <input type="text" placeholder="Voornaam">
                                    <input type="text" placeholder="Achternaam">
                                    <input type="text" placeholder="Email">
                                    <input type="text" placeholder="Telefoonnummer">
                                </form>
                            </div>
                            <div class="form-two">
                                <form>
                                    <input type="text" placeholder="Adres" :value="currentLocation.address[0]">
                                    <input type="text" placeholder="Postcode" :value="currentLocation.address[1]">
                                    <input type="text" placeholder="Alternatief Adres">
                                    <input type="text" placeholder="Alternatieve Postcode">
                                    <select>
                                        <option>-- Land --</option>
                                        <option v-for="country in countries" :selected="country.selected" :value="country.name">{{ country.name }}</option>
                                    </select>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-4">
                        <div class="order-message">
                            <p>Extra informatie</p>
                            <textarea name="message"  placeholder="Speciale notities met betrekking tot de bestelling." rows="9"></textarea>
                            <label><input type="checkbox"> Gebruik het tweede adres als bezorg adres.</label>
                        </div>  
                    </div>                  
                </div>
            </div>
        </div>
        <div id="do_action">
            <div class="container">
                <a class="btn btn-primary" href="overview.html">Terug</a>
                <a class="btn btn-primary pull-right" href="">Betaling</a>
            </div>
        </div><!--/#do_action-->
    </section> <!--/#cart_items-->
</template>
<script>
    export default {
        mixins: [require('./../../mixins/location.js')],
        created() {
            this.currentLocation = this.getCurrentAdress()
        }
    }
</script>