<template>
    <div class="left-sidebar">
        <h2>Categorieën</h2>
        <div class="panel-group category-products" id="accordian"><!--category-productsr-->
            <div class="panel panel-default" v-for="category in categories">
                <div class="panel-heading">
                    <h4 class="panel-title" v-bind:class="{ 'category-active': category.active }"><a href="#" @click.prevent="selectCategory(category)">{{ category.Name }}</a></h4>
                </div>
            </div>
        </div><!--/category-productsr-->

        <div class="price-range"><!--price-range-->
            <h2>Prijs</h2>
            <div class="well">
                <div>
                    <vue-slider ref="priceslider" v-bind="sliders.price" v-model="sliders.price.value"></vue-slider>
                </div>
                <!--<input type="text" class="span2" value="" data-slider-min="0" data-slider-max="600" data-slider-step="5" @onChange="selectPriceRange()" data-slider-value="[250,450]" id="priceSlider" ><br />-->
                <b>€ 0</b> <b class="pull-right">€ 600</b>
                {{ sliders.price }}
            </div>
        </div><!--/price-range-->

    </div>
</template>

<script>
import vueSlider from 'vue-slider-component';
export default {
    components: {
        vueSlider
    },
    mounted() {
        var priceRange = $('#priceSlider');
        if(priceRange.length) {
            priceRange.slider();
            var RGBChange = function() {
                $('#RGB').css('background', 'rgb(' + r.getValue() + ',' + g.getValue() + ',' + b.getValue() + ')')
            };
        }
    },
    created() {
        var self = this;
        $.get(apiUrl + '/categories', function(categories) {
            self.categories = categories;
        });
    },
    methods: {
        selectCategory(category) {
            this.categories.forEach(function(category) {
                category.active = false
            });
            category.active = true
            eventHub.$emit('filter-category', category)
        },
        selectPriceRange(minPrice, maxPrice){
            localStorage.setItem('minProductPrice', minPrice);
            localStorage.setItem('maxProductPrice', maxPrice);
        }
    },    
    watch: {
        'sliders.price.value': function(values){
            this.selectPriceRange(values[0], values[1])
        }
    },
    data:function() {
        return {
            categories: [],
            sliders: {
                price: {
                    width: "100%",
                    height: 8,
                    dotSize: 20,
                    min: (localStorage.getItem('minProductPrice') !== null ? parseInt(localStorage.getItem('minProductPrice')) : 0),
                    max: (localStorage.getItem('GreatestProductPrice') !== null ? parseInt(localStorage.getItem('GreatestProductPrice')) : 500),
                    interval: 1,
                    disabled: false,
                    show: true,
                    piecewise: false,
                    value: [
                        (localStorage.getItem('minProductPrice') !== null ? parseInt(localStorage.getItem('minProductPrice')) : 0),
                        (localStorage.getItem('maxProductPrice') !== null ? parseInt(localStorage.getItem('maxProductPrice')) : 500)
                    ],
                    formatter: "€{value}",
                    bgStyle: {
                        "backgroundColor": "#fff",
                        "boxShadow": "inset 0.5px 0.5px 3px 1px rgba(0,0,0,.36)"
                    },
                    tooltipStyle: {
                        "backgroundColor": "#696763",
                        "borderColor": "#696763"
                    },
                    processStyle: {
                        "backgroundColor": "#FE980F"
                    }
                }
            }
        }
    },
    ready() {
        this.$refs['priceslider'].value = [parseInt(localStorage.getItem('minProductPrice')), parseInt(localStorage.getItem('maxProductPrice'))];
        console.log('pizzapunt');
    }
}
</script>