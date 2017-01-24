<template>
    <div class="items"><!--features_items-->

        <h2 class="title text-center">Beheer</h2>
        <h3>Statistieken</h3>
    </div>
</template>

<script>
    export default {
        mixins: [require('./../../mixins/auth')],
        mounted() {
           HasRole('admin', function(){ return; })
        },
        data() {
            return {
               
            }
        },
        methods:{
        }
    }
</script>