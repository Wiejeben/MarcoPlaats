<template>
    <div class="items"><!--features_items-->
        <h2 class="title text-center">Beheer</h2>
        <h3>Statistieken</h3>
        <div class="category-tab shop-details-tab"><!--category-tab-->
            <div class="col-sm-12">
                <ul class="nav nav-tabs">
                    <li class="active"><a href="#categorieChartTab" data-toggle="tab">Producten per categorie</a></li>
                    <li><a href="#productOrderChartTab" data-toggle="tab">Orders per product</a></li>
                    <li><a href="#categoryOrderChartTab" data-toggle="tab">Orders per categorie</a></li>
                    <li><a href="#userOrderChartTab" data-toggle="tab">Orders per gebruiker</a></li>
                </ul>
            </div>
            <div class="tab-content col-sm-12">
                <div class="tab-pane fade active in" id="categorieChartTab" >
                    <vue-chart v-if="charts.categories.ajaxLoaded" type="pie" ref="categories" :data="charts.categories"></vue-chart>
                    <div v-else class="text-center">
                        <img src="/images/loading.gif" alt="">
                    </div>
                </div>
                <div class="tab-pane" id="productOrderChartTab">
                    <vue-chart v-if="charts.productOrder.ajaxLoaded" type="bar" ref="productOrder" :data="charts.productOrder" :options="charts.Options"></vue-chart>
                    <div v-else class="text-center">
                        <img src="/images/loading.gif" alt="">
                    </div>
                </div>
                <div class="tab-pane" id="categoryOrderChartTab">
                    <vue-chart v-if="charts.categoryOrder.ajaxLoaded" type="bar" ref="categoryOrder" :data="charts.categoryOrder" :options="charts.Options"></vue-chart>
                    <div v-else class="text-center">
                        <img src="/images/loading.gif" alt="">
                    </div>
                </div>            
                <div class="tab-pane" id="userOrderChartTab">
                    <vue-chart v-if="charts.userOrder.ajaxLoaded" type="bar" ref="userOrder" :data="charts.userOrder" :options="charts.Options"></vue-chart>
                    <div v-else class="text-center">
                        <img src="/images/loading.gif" alt="">
                    </div>
                </div>
            </div>
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
                    ChartData.datasets[0].backgroundColor.push(self.randomColor())
                    ChartData.datasets[0].data.push(category.count);
                });
                ChartData.ajaxLoaded = true;
            });

            $.get(apiUrl + '/statistics/productordercount', function(data) {
                var ChartData = self.$data.charts.productOrder;
                data.forEach(function(product) {
                    ChartData.labels.push(product._id.Name)
                    ChartData.datasets[0].backgroundColor.push(self.randomColor())
                    ChartData.datasets[0].data.push(product.Amount);
                });
                ChartData.ajaxLoaded = true;
            });

            $.get(apiUrl + '/statistics/categoryordercount', function(data) {
                var ChartData = self.$data.charts.categoryOrder;
                data.forEach(function(category) {
                    ChartData.labels.push(category.Name)
                    ChartData.datasets[0].backgroundColor.push(self.randomColor())
                    ChartData.datasets[0].data.push(category.Amount);
                });
                ChartData.ajaxLoaded = true;
            });

            $.get(apiUrl + '/statistics/users', function(data) {
                var ChartData = self.$data.charts.userOrder;
                data.forEach(function(user) {
                    ChartData.labels.push(user._id.FirstName+' '+user._id.LastName)
                    ChartData.datasets[0].backgroundColor.push(self.randomColor())
                    ChartData.datasets[0].data.push(user.Amount);
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
                                ticks: {
                                    beginAtZero:true,
                                    stepSize: 1
                                },
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
                                label: "Aantal producten",
                                backgroundColor: [],
                                data: []
                            }
                        ]
                    },
                    productOrder: {
                        ajaxLoaded: false,
                        labels: [],
                        datasets: [
                            {
                                label: "Aantal keer verkocht",
                                backgroundColor: [],
                                data: []
                            }
                        ]
                    },
                    categoryOrder: {
                        ajaxLoaded: false,
                        labels: [],
                        datasets: [
                            {
                                label: "Aantal verkochte producten",
                                backgroundColor: [],
                                data: []
                            }
                        ]
                    },
                    userOrder: {
                        ajaxLoaded: false,
                        labels: [],
                        datasets: [
                            {
                                label: "Aantal orders",
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