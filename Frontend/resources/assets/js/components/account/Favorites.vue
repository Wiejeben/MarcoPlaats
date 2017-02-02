<template>
    <div class="items"><!--features_items-->
        <h2 class="title text-center">Favorites</h2>

        <h3>Producten</h3>
        <div class="table-responsive">
            <table class="table table-condensed">
                <thead>
                    <tr>
                        <td>Afbeelding</td>
                        <td>Product</td>
                        <td>Prijs</td>
                        <td>&nbsp;</td>
                    </tr>
                </thead>
                <tbody v-if="favorites.length > 0">
                    <tr v-for="product in favorites">
                        <td width="35%">
                            <img v-if="product.Images.length > 0" :src="product.Images[0].Image" alt="">
                            <img v-else src="/images/product-placeholder.jpg" :alt="product.Name" />
                        </td>
                        <td>
                            <a :href="'/product.html?id=' + product._id">{{product.Name}}</a>
                        </td>
                        <td>
                            <p>€{{product.Price}}</p>
                        </td>
                        <td class="cart_delete">
                            <a class="cart_quantity_delete" @click.prevent="deletefavoritesItem(product)" href=""><i class="fa fa-times"></i></a>
                        </td>
                    </tr>
                </tbody>
                <tbody v-else>
                    <tr>
                        <td>Geen producten in uw Favorites.</td>
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
            var self = this;
             HasRole('user', function(){
                    $.get(apiUrl + '/users/' + User._id + '/favorites', data => {
                        self.favorites = data;
                    });
             })
        },

        data() {
            return {
                favorites: []
            }
        },

        methods:{
            deletefavoritesItem(product) {
                if (confirm("Weet u zeker dat u dit product wilt verwijderen van uw Favorites?")) {
                    var self = this;
                    $.ajax({
                        url: window.apiUrl+'/users/'+window.User._id + '/favorites/' + product._id,
                        type: 'DELETE',
                        contentType: 'application/json',
                        dataType: 'json',
                        success: function(data){
                            if(data){
                                self.favorites.splice(self.favorites.indexOf(product), 1);
                                NewAlert('success', 'Het product succesvol verwijderd van uw Favorites!')
                            } else {
                                NewAlert('error', 'Er is iets fout gegaan')
                            }
                        }
                    })
                }
            }
        }
    }
</script>