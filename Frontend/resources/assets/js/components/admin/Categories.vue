<template>
    <div class="items"><!--features_items-->

        <h2 class="title text-center">Beheer</h2>
        <div class="row">
            <div class="col-sm-9">
                <h3>Categorieën</h3>
            </div>
            <div class="col-sm-3">
                <a href="add.html" class="btn btn-default orange-btn">Categorie toevoegen</a>
            </div>
        </div>
        <div class="table-responsive">
            <table class="table table-condensed">
                <thead>
                    <tr>
                        <th>Naam</th>
                        <th>Producten</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="categorie in categories">
                        <td>{{ categorie.Name }}</td>
                        <td>{{ categorie.ProductIds.length }}</td>
                        <td class="table_button"><a :href="'edit.html?id=' + categorie._id"><i class="fa fa-pencil"></i></a></td>
                        <td class="table_button"><a class="cart_quantity_delete" @click.prevent="deleteCategorie(categorie)"><i class="fa fa-times"></i></a></td>
                    </tr>
                </tbody>
            </table>
        </div>

    </div>
</template>

<script>
    export default {
        created() {
            console.info('Categories admin ready.');
            var self = this;

            HasRole('admin', function() {
                $.get(apiUrl + '/categories', function(data) {
                    self.categories = data;
                });
            })
        },
        data() {
            return {
                categories: []
            }
        },
        methods:{
            deleteCategorie(categorie){
                var self = this;
                $.ajax({
                    url: window.apiUrl + '/categories/' + categorie._id,
                    type: 'DELETE',
                    contentType: 'application/json',
                    data: JSON.stringify(categorie),
                    dataType: 'json',                    
                    success: function(data, status, jqXHR){
                        if(jqXHR.status == 204){
                            self.categories.splice(self.categories.indexOf(categorie), 1);
                            NewAlert('success', 'Categorie succesvol verwijderd!');
                        } else {
                            NewAlert('error', 'Er is iets mis gegaan!');
                        }
                    }
                });
            }
        }
    }
</script>