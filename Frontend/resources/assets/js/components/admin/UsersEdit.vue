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
                            <!--<option v-for="country in countries" :selected="country.selected" :value="country.name">{{ country.name }}</option>-->
                        </select>
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
        mixins: [require('./../../mixins/auth')],

        created() {
            console.log('Users edit is ready.');

            var self = this;
            var token = location.search.split('id=')[1];
            $.get(apiUrl + '/users/' + token, function(data) {
                self.user = data;
            });
        },
        data() {
            return {
                user: null
            }
        },
        methods:{
            submit(){
                console.log('submitted');
                // $.ajax({
                //     url: window.apiUrl+'/users',
                //     type: 'POST',
                //     contentType: 'application/json',
                //     data: JSON.stringify({
                //         FirstName: 'Rick',
                //         LastName: 'Droogh',
                //         Email: '0911272@hr.nl',
                //         Addresses : {
                //             Street: 'test123',

                //         }
                //     }),
                //     dataType: 'json'
                // });
            }
        }
    }
</script>