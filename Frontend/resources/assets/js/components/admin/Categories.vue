<template>
    <div class="items"><!--features_items-->

        <h2 class="title text-center">Beheer</h2>
        <div class="row">
            <div class="col-sm-9">
                <h3>Categorieën</h3>
            </div>
            <div class="col-sm-3">
                <a href="addcategorie.html" class="btn btn-default orange-btn">Categorie toevoegen</a>
            </div>
        </div>
        <div class="table-responsive">
            <table class="table table-condensed">
                <thead>
                    <tr>
                        <th>Naam</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="categorie in categories">
                        <td>{{ categorie.Name }}</td>
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
                    success: function(data){
                        if(data == true){
                            self.categories.splice(self.categories.indexOf(categorie), 1);
                            NewAlert('success', 'Categorie succesvol verwijdert!');
                        } else {
                            NewAlert('error', 'Er is iets fout gegaan');
                        }
                    }
                });
            }
        }
    }
</script>