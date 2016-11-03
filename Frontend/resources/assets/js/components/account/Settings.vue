<template>
    <div class="items"><!--features_items-->
        <h2 class="title text-center">Instellingen</h2>
        <h3>Account</h3>

        <div class="row">
            <div class="col-sm-12 clearfix">
                <div class="form-one">
                    <form>
                        <input type="text" placeholder="Voornaam">
                        <input type="text" placeholder="Achternaam">
                        <input type="text" placeholder="Email">
                        <input type="text" placeholder="Telefoonnummer">
                        <input type="text" placeholder="Adres" :value="currentLocation.address[0]">
                        <input type="text" placeholder="Postcode" :value="currentLocation.address[1]">
                        <input type="text" placeholder="Alternatief Adres">
                        <input type="text" placeholder="Alternatieve Postcode">
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
        mixins: [require('./../../mixins/location.js')],
        created() {
            this.currentLocation = this.getCurrentAdress()
        },
        methods:{
            submitSettings(){
                console.log('submitted');
                $.ajax(window.apiUrl+'/users', {
                    method: 'POST',
                    dataType: 'json',
                    data: {
                        "FirstName": 'Rick',
                        "LastName": 'Droogh',
                        "Email": '0911272@hr.nl'
                    }
                }).then(function(data) {
                    console.log(data);
                });
            }
        }
    }
</script>