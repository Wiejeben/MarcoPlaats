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
                    <tr v-for="user in users">
                        <td>{{ user.FirstName }}</td>
                        <td>{{ user.LastName }}</td>
                        <td>{{ user.Email }}</td>
                        <td>{{ user.PhoneNumber }}</td>
                        <td class="table_button"><a :href="'/admin/users/edit.html?id=' + user._id"><i class="fa fa-pencil"></i></a></td>
                        <td class="table_button"><a class="cart_quantity_delete" href=""><i class="fa fa-times"></i></a></td>
                    </tr>
                </tbody>
            </table>
        </div>

    </div>
</template>

<script>
    export default {
        created() {
            console.log('Users admin ready.');

            var that = this;
            $.get(apiUrl + '/users', function(data) {
                that.users = data.data;
            });
        },

        data() {
            return {
                users: []
            }
        }
    }
</script>