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

            </div>

            <div class="col-xs-12">
                <button href="#" class="btn btn-primary" @click.prevent="submit()">Opslaan</button><br><br>
            </div>
        </form>
    </div>
</template>
<script>
    export default {
        mixins: [
            require('./../../mixins/location.js'), 
            require('./../../mixins/auth')
        ],
        created() {
            var self = this;

            eventHub.$on('user-detected', function(data) {
                self.user = data;
            })
        },
        data() {
            return {
                user: null
            }
        },
        methods:{
            submit() {
                var self = this;
                $.ajax({
                    url: window.apiUrl + '/users/' + User._id,
                    type: 'PUT',
                    contentType: 'application/json',
                    data: JSON.stringify(this.user),
                    dataType: 'json',
                    success: function(data) {
                        if(data == true){
                            self.newAlert('success', 'Uw instellingen zijn succesvol aangepast!');
                        } else {
                            self.newAlert('error', 'Er is iets fout gegaan');
                        }
                    }
                });
            }
        }
    }
</script>