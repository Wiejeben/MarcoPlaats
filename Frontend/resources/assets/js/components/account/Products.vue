<template>
    <div class="items"><!--features_items-->
        <h2 class="title text-center">Products</h2>

        <h3>Producten</h3>
        <a href="addproduct.html">Add product</a>
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
                    <tr v-for="product in products">
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
                            <a class="cart_quantity_delete" @click.prevent="deleteProduct(product)" href=""><i class="fa fa-times"></i></a>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
    export default {
        created() {
            self = this;
            HasRole('user', function(){               
                $.get(apiUrl + '/users/' + User._id + '/products', function(_products) {
                    self.products = _products.productObjects;
                });
            })
        },
        data() {
            return {
                products: []
            }
        },
        methods:{
            deleteProduct(product){
                var self = this;
                $.ajax({
                    url: window.apiUrl+'/users/' + User._id + '/products/' + product._id,
                    type: 'DELETE',
                    success: function(data){
                        if(data == true){
                            self.products.splice(self.products.indexOf(product), 1);
                            self.newAlert('success', 'Product succesvol verwijdert!');
                        } else {
                            self.newAlert('error', 'Er is iets fout gegaan');
                        }
                    }
                });
            }
        }
    }
</script>