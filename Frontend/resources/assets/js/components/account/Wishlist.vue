<template>
    <div class="items"><!--features_items-->
        <h2 class="title text-center">Verlanglijstje</h2>

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
                            <h4><a href="">{{product.Name}}</a></h4>
                        </td>
                        <td>
                            <p>€{{product.Price}}</p>
                        </td>
                        <td class="cart_delete">
                            <a class="cart_quantity_delete" @click.prevent="deleteWishlistItem(product)" href=""><i class="fa fa-times"></i></a>
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
            console.info('Wishlist account ready.');

            var self = this;
             HasRole('user', function(){
                    $.get(apiUrl + '/users/' + User._id + '/wishlist', function(data) {
                        self.wishlist = data;
                    });
             })
        }, 
        data() {
            return {
                wishlist: []
            }
        },
        methods:{
            deleteWishlistItem(product) {
                this.wishlist.productObjects.splice(this.wishlist.productObjects.indexOf(product), 1);
                var self = this;

                $.ajax({
                    url: window.apiUrl+'/users/'+window.User._id + '/wishlist/' + product._id,
                    type: 'DELETE',
                    success: function(data){
                        if(data == true){
                            self.newAlert('success', 'Product succesvol verwijdert van verlanglijstje!');
                        } else {
                            self.newAlert('error', 'Er is iets fout gegaan');
                        }
                    }
                });
            }
        }
    }
</script>