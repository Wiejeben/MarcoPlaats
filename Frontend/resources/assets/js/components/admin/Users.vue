<template>
    <div class="items"><!--features_items-->

        <h2 class="title text-center">Beheer</h2>
        <h3>Gebruikers</h3>

        <div class="table-responsive">
            <table class="table table-condensed">
                <thead>
                    <tr>
                        <td>Voornaam</td>
                        <td>Achternaam</td>
                        <td>E-mail</td>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="user in users">
                        <td><a href="">{{ user.FirstName }}</a></td>
                        <td><a href="">{{ user.LastName }}</a></td>
                        <td><a href="">{{ user.Email }}</a></td>
                        <td class=""><a :href="'/admin/users/edit.html?id=' + user._id"><i class="fa fa-pencil"></i></a></td>
                        <td class=""><a class="cart_quantity_delete" href=""><i class="fa fa-times"></i></a></td>
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