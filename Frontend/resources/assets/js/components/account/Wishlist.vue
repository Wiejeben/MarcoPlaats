<template>
    <div class="items"><!--features_items-->
        <h2 class="title text-center">Wishlist</h2>

        <h3>Producten</h3>
        <div class="table-responsive">
            <table class="table table-condensed">
                <thead>
                    <tr>
                        <td>Afbeelding</td>
                        <td>Product</td>
                        <td>Prijs</td>
                        <td>Aantal</td>
                        <td>Totaal</td>
                        <td></td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <a href=""><img src="/images/cart/one.png" alt=""></a>
                        </td>
                        <td>
                            <h4><a href="">Colorblock Scuba</a></h4>
                        </td>
                        <td>
                            <p>€59</p>
                        </td>
                        <td>
                            <p>1</p>
                        </td>
                        <td>
                            <p class="cart_total_price">€59</p>
                        </td>
                        <td class="cart_delete">
                            <a class="cart_quantity_delete" href=""><i class="fa fa-times"></i></a>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <a href=""><img src="/images/cart/one.png" alt=""></a>
                        </td>
                        <td>
                            <h4><a href="">Colorblock</a></h4>
                        </td>
                        <td>
                            <p>€55</p>
                        </td>
                        <td>
                            <p>2</p>
                        </td>
                        <td>
                            <p class="cart_total_price">€110</p>
                        </td>
                        <td class="cart_delete">
                            <a class="cart_quantity_delete" href=""><i class="fa fa-times"></i></a>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script>
    export default {
        mixins: [require('./../../mixins/auth')],

        created() {
            console.log('test')
            //this.currentLocation = this.getCurrentAdress()
        }
    }
</script>