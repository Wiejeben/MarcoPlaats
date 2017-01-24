<template>
    <div class="items"><!--features_items-->

        <h2 class="title text-center">Beheer</h2>
        <h3>Statistieken</h3>
        <vue-chart type="doughnut" :data="charts.test"></vue-chart>
    </div>
</template>
<script>
import VueChart from 'vue-chart';
    export default {
        mixins: [require('./../../mixins/auth')],
        mounted() {
           HasRole('admin', function(){ return; })
        },
        components: {
            VueChart
        },
        data() {
            return {
               charts: {
                    test: {
                        labels: ["REMAIN", "LEAVE"],
                        datasets: [{
                            backgroundColor: ["#36A2EB", "#FF6384"],
                            data: [1, 1]
                        }]
                    }
               }
            }
        },
        methods:{
        }
    }
</script>