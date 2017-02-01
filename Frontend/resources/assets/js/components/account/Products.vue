<template>
    <div class="items"><!--features_items-->
        <h2 class="title text-center">Product overzicht</h2>
        <div class="row">
            <div class="col-sm-9">
                <h3>Producten</h3>
            </div>
            <div class="col-sm-3">
                <a href="addproduct.html" class="btn btn-default orange-btn">Product toevoegen</a>
            </div>
        </div>
        <div class="table-responsive">
            <table class="table table-condensed">
                <thead>
                    <tr>
                        <th>Naam</th>
                        <th>Amount</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody v-if="products.length > 0">
                    <tr v-for="product in products" v-if="product.DeletedAt == null">
                        <td>{{ product.Name }}</td>
                        <td>{{ product.Amount }}</td>
                        <td>{{ product.Price }}</td>
                        <td class="table_button"><a :href="'editproduct.html?id=' + product._id"><i class="fa fa-pencil"></i></a></td>
                        <td class="table_button"><a class="cart_quantity_delete" @click.prevent="deleteProduct(product)"><i class="fa fa-times"></i></a></td>
                    </tr>
                </tbody>
                <tbody v-else>
                    <tr>
                        <td>U heeft geen producten.</td>
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
                    self.products = _products;
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
                    url: window.apiUrl + '/products/' + product._id,
                    type: 'DELETE',
                    contentType: 'application/json',
                    data: JSON.stringify(product),
                    dataType: 'json',
                    success: function(data, status, jqXHR){
                        if(jqXHR.status == 204){
                            self.products.splice(self.products.indexOf(product), 1);
                            NewAlert('success', 'Product succesvol verwijdert!');
                        } else {
                            NewAlert('error', 'Er is iets fout gegaan');
                        }
                    }
                });
            }
        }
    }
</script>