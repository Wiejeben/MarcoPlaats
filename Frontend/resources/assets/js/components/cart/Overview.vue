<template>
    <section id="cart_items">
        <div class="container">
            <div class="breadcrumbs">
                <ol class="breadcrumb">
                  <li><a href="/">Home</a></li>
                  <li class="active">Shopping Cart</li>
                </ol>
            </div>

            <div class="review-payment">
                <h2>Winkelwagen</h2>
            </div>

            <div class="table-responsive cart_info">
                <table class="table table-condensed">
                    <thead>
                        <tr class="cart_menu">
                            <td class="image">Afbeelding</td>
                            <td class="description">Product</td>
                            <td class="price">Prijs</td>
                            <td class="quantity">Aantal</td>
                            <td class="total">Totaal</td>
                            <td></td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="cart_product">
                                <a href=""><img src="/images/cart/one.png" alt=""></a>
                            </td>
                            <td class="cart_description">
                                <h4><a href="">Colorblock Scuba</a></h4>
                                <p>Web ID: 1089772</p>
                            </td>
                            <td class="cart_price">
                                <p>€59</p>
                            </td>
                            <td class="cart_quantity">
                                <div class="cart_quantity_button">
                                    <a class="cart_quantity_down" href=""> - </a>
                                    <input class="cart_quantity_input" type="text" name="quantity" value="1" autocomplete="off" size="2">
                                    <a class="cart_quantity_up" href=""> + </a>
                                </div>
                            </td>
                            <td class="cart_total">
                                <p class="cart_total_price">€59</p>
                            </td>
                            <td class="cart_delete">
                                <a class="cart_quantity_delete" href=""><i class="fa fa-times"></i></a>
                            </td>
                        </tr>

                        <tr>
                            <td class="cart_product">
                                <a href=""><img src="/images/cart/two.png" alt=""></a>
                            </td>
                            <td class="cart_description">
                                <h4><a href="">Colorblock Scuba</a></h4>
                                <p>Web ID: 1089772</p>
                            </td>
                            <td class="cart_price">
                                <p>€59</p>
                            </td>
                            <td class="cart_quantity">
                                <div class="cart_quantity_button">
                                    <a class="cart_quantity_down" href=""> - </a>
                                    <input class="cart_quantity_input" type="text" name="quantity" value="1" autocomplete="off" size="2">
                                    <a class="cart_quantity_up" href=""> + </a>
                                </div>
                            </td>
                            <td class="cart_total">
                                <p class="cart_total_price">€59</p>
                            </td>
                            <td class="cart_delete">
                                <a class="cart_quantity_delete" href=""><i class="fa fa-times"></i></a>
                            </td>
                        </tr>
                        <tr>
                            <td class="cart_product">
                                <a href=""><img src="/images/cart/three.png" alt=""></a>
                            </td>
                            <td class="cart_description">
                                <h4><a href="">Colorblock Scuba</a></h4>
                                <p>Web ID: 1089772</p>
                            </td>
                            <td class="cart_price">
                                <p>€59</p>
                            </td>
                            <td class="cart_quantity">
                                <div class="cart_quantity_button">
                                    <a class="cart_quantity_down" href=""> - </a>
                                    <input class="cart_quantity_input" type="text" name="quantity" value="1" autocomplete="off" size="2">
                                    <a class="cart_quantity_up" href=""> + </a>
                                </div>
                            </td>
                            <td class="cart_total">
                                <p class="cart_total_price">€59</p>
                            </td>
                            <td class="cart_delete">
                                <a class="cart_quantity_delete" href=""><i class="fa fa-times"></i></a>
                            </td>
                        </tr>
                        <tr>
                            <td>&nbsp;</td>
                            <td><h4>Sub totaal</h4></td>
                            <td colspan="2">&nbsp;</td>
                            <td>€59</td>
                        </tr>
                        <tr>
                            <td>&nbsp;</td>
                            <td><h4>BTW</h4></td>
                            <td colspan="2">&nbsp;</td>
                            <td>€2</td>
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
                            <td><span>€61</span></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <div id="do_action">
            <div class="container">
                <a class="btn btn-primary" href="">Terug</a>
                <a class="btn btn-primary pull-right" href="">Bestellen</a>
            </div>
        </div><!--/#do_action-->
    </section>
</template>

<script>
    export default {
        mounted() {
            console.info('Shopping cart ready.')
        }
    }
</script>