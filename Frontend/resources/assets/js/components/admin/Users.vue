<template>
    <div class="items"><!--features_items-->

        <h2 class="title text-center">Beheer</h2>
        <h3>Gebruikers</h3>

        <div class="table-responsive">
            <table class="table table-condensed">
                <thead>
                    <tr>
                        <th>Voornaam</th>
                        <th>Achternaam</th>
                        <th>E-mail</th>
                        <th>Telefoonnummer</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="user in users" v-if="user.DeletedAt == null">
                        <td>{{ user.FirstName }}</td>
                        <td>{{ user.LastName }}</td>
                        <td>{{ user.Email }}</td>
                        <td>{{ user.PhoneNumber }}</td>
                        <td class="table_button"><a :href="'/admin/users/edit.html?id=' + user._id"><i class="fa fa-pencil"></i></a></td>
                        <td class="table_button"><a class="cart_quantity_delete" @click.prevent="deleteUser(user)"><i class="fa fa-times"></i></a></td>
                    </tr>
                </tbody>
            </table>
        </div>

    </div>
</template>

<script>
    export default {
        created() {
            console.info('Users admin ready.');
            var self = this;

            HasRole('admin', function() {

                $.get(apiUrl + '/users', function(data) {
                    self.users = data;
                });

            })
        },
        data() {
            return {
                users: []
            }
        },
        methods:{
            deleteUser(user){
                if (confirm("Weet u zeker dat u deze gebruiker permanent wilt verwijderen?")) {
                    var self = this;

                    $.ajax({
                        url: window.apiUrl + '/users/' + user._id,
                        type: 'DELETE',
                        contentType: 'application/json',
                        data: JSON.stringify(user),
                        dataType: 'json',
                        success(data, status, jqXHR) {
                            if(jqXHR.status == 204){
                                self.users.splice(self.users.indexOf(user), 1);
                                NewAlert('success', 'Gebruiker is succesvol verwijderd!');
                            } else {
                                NewAlert('error', 'Er is iets mis gegaan!');
                            }
                        }
                    })
                }
            }
        }
    }
</script>