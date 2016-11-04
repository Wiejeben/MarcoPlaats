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
                        <select>
                            <option>-- Land --</option>
                            <option v-for="country in countries" :selected="country.selected" :value="country.name">{{ country.name }}</option>
                        </select>
                        <div id="do_action">
                            <a href="#" class="btn btn-primary" @click.prevent="submitSettings()">Opslaan</a>
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
            // this.currentLocation = this.getCurrentAdress()
            var self = this;
            eventHub.$on('user-detected', function(data){
                self.user = data;
            })
        },
        data() {
            return {
                user: null
            }
        },
        methods:{
            submitSettings(){
                /*if(this.user.MainAddress.city == null){
                    alert('jaja');
                }*/
                console.log(this.user);
                /*$.ajax({
                    url: window.apiUrl + '/users/' + localStorage.getItem('authorization'),
                    type: 'POST',
                    contentType: 'application/json',
                    data: self.user,
                    dataType: 'json'
                });*/
            }
        }
    }
</script>