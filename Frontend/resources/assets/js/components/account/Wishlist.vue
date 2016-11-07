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
                        <td></td>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="product in wishlist.productObjects">
                        <td>
                            <a href=""><img class="img-responsive" :src="product.Images[0]" alt=""></a>
                        </td>
                        <td>
                            <h4><a href="" v-model="product.Name">{{product.Name}}</a></h4>
                        </td>
                        <td>
                            <p>€{{product.Price}}</p>
                        </td>
                        <td class="cart_delete">
                            <a class="cart_quantity_delete" @click.prevent="deleteWishlistItem(product._id)" href=""><i class="fa fa-times"></i></a>
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
            console.log('get products from wishlist');

            var self = this;

            $.get(window.apiUrl + '/auth/user', function(user) {
                $.get(apiUrl + '/users/' + user._id + '/wishlist', function(data) {
                    self.wishlist = data;
                });
            });

            //this.currentLocation = this.getCurrentAdress()
        }, 
        data() {
            return {
                wishlist: []
            }
        },
        methods:{
            deleteWishlistItem(id) {
                console.log("Delete %s", id);
                // $.ajax({
                //     url:apiUrl +
                // })
            }
        }
    }
</script>