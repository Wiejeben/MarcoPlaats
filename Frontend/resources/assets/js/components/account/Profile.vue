<template>
    <div class="items"><!--features_items-->
        <h2 class="title text-center">Instellingen</h2>
        <h3>Account</h3>
        <div v-if="user != null">
            <dl class="dl-horizontal">
                <dt>Naam:</dt>
                <dd>{{ user.FirstName }} {{ user.LastName }}</dd>
                <dt>Email:</dt>
                <dd>{{ user.Email }}</dd>
                <dt>Telefoon:</dt>
                <dd>{{ user.PhoneNumber }}</dd>
                <dt>Adres:</dt>
                <dd>{{ user.MainAddress.Address }}</dd>
                <dt>City:</dt>
                <dd>{{ user.MainAddress.City }}</dd>
                <dt>Postcode:</dt>
                <dd>{{ user.MainAddress.Zipcode }}</dd>
            </dl>
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

            console.info('created');
        },
        data() {
            return {
                user: null
            }
        }
    }
</script>