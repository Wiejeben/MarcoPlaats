<template>
    <div class="items"><!--features_items-->

        <h2 class="title text-center">Beheer</h2>
        <h3>Producten</h3>
        <div class="table-responsive">
            <table class="table table-condensed">
                <thead>
                    <tr>
                        <th>Naam</th>
                        <th>Quantiteit</th>
                        <th>Prijs</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="product in products">
                        <td>{{ product.Name }}</td>
                        <td>{{ product.Amount }}</td>
                        <td>&euro; {{ product.Price }}</td>
                        <td class="table_button"><a :href="'/product.html?id=' + product._id"><i class="fa fa-search"></i></a></td>
                        <td class="table_button"><a :href="'edit.html?id=' + product._id"><i class="fa fa-pencil"></i></a></td>
                        <td class="table_button"><a href="javascript:;" class="cart_quantity_delete" @click.prevent="deleteProduct(product)"><i class="fa fa-times"></i></a></td>
                    </tr>
                </tbody>
            </table>
        </div>

    </div>
</template>

<script>
    export default {
        created() {
            console.info('Products admin ready.');
            var self = this;

            HasRole('admin', function() {
                $.get(apiUrl + '/products', function(data) {
                    self.products = data;
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