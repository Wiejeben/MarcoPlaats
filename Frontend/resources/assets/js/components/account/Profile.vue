<template>
    <div class="items"><!--features_items-->
        <h2 class="title text-center">Profiel</h2>
        <h3>Account</h3>
        
        <div v-if="user != null" class="row">
            <div class="col-sm-6 col-xs-12">
                <h4>Persoonlijke informatie</h4>
                <dl class="dl-horizontal">
                    <dt>Naam:</dt>
                    <dd>{{ user.FirstName }} {{ user.LastName }}</dd>
                    <dt>Email:</dt>
                    <dd>{{ user.Email }}</dd>
                    <dt>Telefoon:</dt>
                    <dd>{{ user.PhoneNumber }}</dd>
                </dl>
            </div>
        </div>

        <div v-if="user != null" class="row">
            <div class="col-sm-6 col-xs-12">
                <h4>Adres</h4>
                <dl class="dl-horizontal">
                    <dt>Adres:</dt>
                    <dd>{{ user.MainAddress.Address }}</dd>
                    <dt>City:</dt>
                    <dd>{{ user.MainAddress.City }}</dd>
                    <dt>Postcode:</dt>
                    <dd>{{ user.MainAddress.Zipcode }}</dd>
                </dl>
            </div>
            <div class="col-sm-6 col-xs-12">
                <h4>Alternatief adres</h4>
                <dl class="dl-horizontal">
                    <dt>Adres:</dt>
                    <dd>{{ user.DeliveryAddress.Address }}</dd>
                    <dt>City:</dt>
                    <dd>{{ user.DeliveryAddress.City }}</dd>
                    <dt>Postcode:</dt>
                    <dd>{{ user.DeliveryAddress.Zipcode }}</dd>
                </dl>
            </div>
        </div>
        <div class="row">
            <div class="col-xs-12">
                <a href="settings.html" style="margin-left: 16px;" class="btn btn-primary">Gegevens aanpassen</a><br><br>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        mixins: [require('./../../mixins/auth')],
        created() {
            var self = this;
            HasRole('user', function(){
                self.user = window.User;
            })
        },
        data() {
            return {
                user: null
            }
        }
    }
</script>