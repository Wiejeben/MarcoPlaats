<template>
    <div class="items"><!--features_items-->
        <h2 class="title text-center">Instellingen</h2>
        <h3>Account</h3>

        <div class="row">
            <div class="col-sm-12 clearfix">
                <div class="form-one">
                    <form v-if="user != null">
                        <input type="text" placeholder="Voornaam" v-model="user.FirstName">
                        <input type="text" placeholder="Achternaam" v-model="user.LastName">
                        <input type="text" placeholder="Email" v-model="user.Email">
                        <input type="text" placeholder="Telefoonnummer" v-model="user.PhoneNumber">
                        <input type="text" placeholder="Adres" v-model="user.MainAddress.Address">
                        <input type="text" placeholder="Postcode" v-model="user.MainAddress.Zipcode">
                        <input type="text" placeholder="Plaats" v-model="user.MainAddress.City">
                        <input type="text" placeholder="Alternatief Adres" v-model="user.DeliveryAddress.Address">
                        <input type="text" placeholder="Alternatieve Postcode" v-model="user.DeliveryAddress.Zipcode">
                        <input type="text" placeholder="Alternatieve Plaats" v-model="user.DeliveryAddress.City">
                        <div id="do_action">
                            <a href="#" class="btn btn-primary" @click.prevent="submit()">Opslaan</a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
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