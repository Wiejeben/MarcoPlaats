<template>
    <div v-if="userProfile != false" class="items"><!--features_items-->
        <h2 class="title text-center">Instellingen</h2>
        <h3>Account</h3>

        <div class="row">
            <div class="col-sm-6 col-xs-12">
                <h4>Persoonlijke informatie</h4>
                <dl class="dl-horizontal">
                    <dt>Naam:</dt>
                    <dd>{{ userProfile.FirstName }} {{ userProfile.LastName }}</dd>
                    <dt>Email:</dt>
                    <dd>{{ userProfile.Email }}</dd>
                    <dt>Telefoon:</dt>
                    <dd>{{ userProfile.PhoneNumber }}</dd>
                </dl>
            </div>
        </div>

        <div class="row">
            <div class="col-sm-6 col-xs-12">
                <h4>Adres</h4>
                <dl class="dl-horizontal">
                    <dt>Adres:</dt>
                    <dd>{{ userProfile.MainAddress.Address }}</dd>
                    <dt>City:</dt>
                    <dd>{{ userProfile.MainAddress.City }}</dd>
                    <dt>Postcode:</dt>
                    <dd>{{ userProfile.MainAddress.Zipcode }}</dd>
                </dl>
            </div>
            <div class="col-sm-6 col-xs-12">
                <h4>Alternatief adres</h4>
                <dl class="dl-horizontal">
                    <dt>Adres:</dt>
                    <dd>{{ userProfile.DeliveryAddress.Address }}</dd>
                    <dt>City:</dt>
                    <dd>{{ userProfile.DeliveryAddress.City }}</dd>
                    <dt>Postcode:</dt>
                    <dd>{{ userProfile.DeliveryAddress.Zipcode }}</dd>
                </dl>
            </div>
        </div>
    </div>
    <div v-else>
        <div v-if="found === null">
            <h2>Bezig met laden</h2>
        </div>
        <div v-else>
            <h2>404 verkoper niet gevonden</h2>
        </div>
    </div>
</template>
<script>
    export default {
        mounted() {
            var that = this,
                id = location.search.split('id=')[1];

            $.get(apiUrl + '/users/' + id, function(user) {
                that.found = true;
                that.userProfile = user;
            })
            .fail(function() {
                that.found = false;
            });
        },
        data() {
            return {
                userProfile: false,
                found: null
            }
        }
    }
</script>