<template>
    <div class="items"><!--features_items-->

        <h2 class="title text-center">Beheer</h2>
        <h3>Categorieën</h3>

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
                    self.categories = data.data;
                });
            })
        },
        data() {
            return {
                categories: []
            }
        },
        methods:{
            deleteUser(user){
                var self = this;

                $.ajax({
                    url: window.apiUrl+'/categories/' + user._id,
                    type: 'DELETE',
                    success: function(data){
                        if(data == true){
                            self.categories.splice(self.categories.indexOf(user), 1);
                            self.newAlert('success', 'Gebruiker succesvol verwijdert!');
                        } else {
                            self.newAlert('error', 'Er is iets fout gegaan');
                        }
                    }
                });
            }
        }
    }
</script>