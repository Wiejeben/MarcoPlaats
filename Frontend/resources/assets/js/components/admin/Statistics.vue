<template>
    <div class="items"><!--features_items-->
        <h2 class="title text-center">Beheer</h2>
        <h3>Statistieken</h3>
        <vue-chart v-if="charts.categories.ajaxLoaded" type="radar" ref="categories" :data="charts.categories" :option="charts.Options"></vue-chart>
        <div v-else class="text-center">
            <img src="/images/loading.gif" alt="">
        </div>
        <br><br>
        <vue-chart v-if="charts.productOrder.ajaxLoaded" type="bar" ref="productOrder" :data="charts.productOrder" :option="charts.Options"></vue-chart>
        <div v-else class="text-center">
            <img src="/images/loading.gif" alt="">
        </div>
        <br><br>
    </div>
</template>
<script>
import VueChart from 'vue-chart';
    export default {
        mixins: [require('./../../mixins/auth')],
        created() {
            var self = this;
            HasRole('admin', function(){ return; })
            $.get(apiUrl + '/statistics/category?start=0&end=9999999999', function(data) {
                var ChartData = self.$data.charts.categories;
                data.forEach(function(category) {
                    ChartData.labels.push(category._id)
                    ChartData.datasets[0].data.push(category.count);
                });
                ChartData.ajaxLoaded = true;
            });
            $.get(apiUrl + '/statistics/productordercount', function(data) {
                var ChartData = self.$data.charts.productOrder;
                data.forEach(function(category) {
                    ChartData.labels.push(category._id.Name)
                    ChartData.datasets[0].backgroundColor.push(self.randomColor())
                    ChartData.datasets[0].data.push(category.Amount);
                });
                ChartData.ajaxLoaded = true;
            });
        },
        components: {
            VueChart
        },
        data() {
            return {
               charts: {
                    Options: {
                        scales: {
                            yAxes: [{
                                scaleLabel: {
                                    display: true,
                                    labelString: 'probability'
                                }
                            }]
                        }
                    },
                    categories: {
                        ajaxLoaded: false,
                        labels: [],
                        datasets: [
                            {
                                label: "Producten per categorie",
                                fill: false,
                                lineTension: 0.1,
                                backgroundColor: "rgba(75,192,192,0.4)",
                                borderColor: "rgba(75,192,192,1)",
                                borderCapStyle: 'butt',
                                borderDash: [],
                                borderDashOffset: 0.0,
                                borderJoinStyle: 'miter',
                                pointBorderColor: "rgba(75,192,192,1)",
                                pointBackgroundColor: "#fff",
                                pointBorderWidth: 1,
                                pointHoverRadius: 5,
                                pointHoverBackgroundColor: "rgba(75,192,192,1)",
                                pointHoverBorderColor: "rgba(220,220,220,1)",
                                pointHoverBorderWidth: 2,
                                pointRadius: 1,
                                pointHitRadius: 10,
                                data: [],
                                spanGaps: false,
                            }
                        ]
                    },
                    productOrder: {
                        ajaxLoaded: false,
                        labels: [],
                        datasets: [
                            {
                                label: "Aantal verkochte producten",
                                backgroundColor: [],
                                data: []
                            }
                        ]
                    }
                }
            }
        },
        methods:{
            randomColor(){
                return '#' + Math.random().toString(16).slice(2, 8);
            }
        }
    }
</script>