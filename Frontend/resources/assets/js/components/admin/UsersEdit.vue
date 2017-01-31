<template>
    <div class="items"><!--features_items-->
        <h2 class="title text-center">Instellingen</h2>

        <form v-if="user != null" class="row">
            <div class="col-sm-6 col-xs-12 shopper-info">
                <h4>Account</h4>
                <input class="form-control" placeholder="Voornaam"  v-model="user.FirstName">
                <input class="form-control" placeholder="Achternaam" v-model="user.LastName">
                <input type="email" class="form-control" placeholder="Email" v-model="user.Email">
                <input class="form-control" placeholder="Telefoonnummer" v-model="user.PhoneNumber">
                <select id="RoleSelect" class="form-control">
                    <option v-for="role in Roles" :selected="role.selected" :value="role.name">{{ role.name }}</option>
                </select>

                <h4 class="form-spacing">Adres</h4>
                <input class="form-control" placeholder="Adres" v-model="user.MainAddress.Address">
                <input class="form-control" placeholder="Postcode" v-model="user.MainAddress.Zipcode">
                <input class="form-control" placeholder="Plaats" v-model="user.MainAddress.City">
            </div>

            <div class="col-sm-6 col-xs-12 shopper-info">
                <h4>Alternatief adres</h4>
                <input class="form-control" placeholder="Adres" v-model="user.DeliveryAddress.Address">
                <input class="form-control" placeholder="Postcode" v-model="user.DeliveryAddress.Zipcode">
                <input class="form-control" placeholder="Plaats" v-model="user.DeliveryAddress.City">

                <div class="checkbox">
                    <label>
                        <input type="checkbox" v-model="user.PublicWishlist"> Verlanglijstje openbaar
                    </label>
                </div>
            </div>

            <div class="col-xs-12">
                <button type="submit" class="btn btn-primary" @click.prevent="submit()">Opslaan</button>
                <br><br>
            </div>
        </form>
    </div>
</template>
<script>
    export default {
        mixins: [require('./../../mixins/auth')],
        created() {
            var self = this;
            HasRole('admin', function(){
                self._id = location.search.split('id=')[1];
                $.get(apiUrl + '/users/' + self._id, function(data) {
                    self.user = data;

                    self.Roles.forEach(function(value) {
                        value.selected = (self.user.Role == value.name);
                    });
                });
            })
        },
        data() {
            return {
                user: null
            }
        },
        methods:{
            submit(){
                var self = this;
                self.user.Role = $("#RoleSelect").val();
                $.ajax({
                    url: window.apiUrl+'/users/' + self._id,
                    type: 'PUT',
                    contentType: 'application/json',
                    data: JSON.stringify(self.user),
                    dataType: 'json',
                    success: function(data, status, jqXHR){
                        if(jqXHR.status == 204){
                            NewAlert('success', 'Gebruiker succesvol aangepast!');
                        } else {
                            NewAlert('error', 'Er is iets fout gegaan');
                        }
                    }
                });
            },
        }
    }
</script>