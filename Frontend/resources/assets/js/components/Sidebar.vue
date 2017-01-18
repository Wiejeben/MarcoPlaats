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
        var self = this;
        $.get(apiUrl + '/products-heighest-price', function(response) {
            localStorage.setItem('GreatestProductPrice', response.Price);
            if (localStorage.getItem('minProductPrice') === undefined || 
                localStorage.getItem('minProductPrice') === null || 
                parseInt(localStorage.getItem('minProductPrice')) > response.Price
            ) {
                localStorage.setItem('minProductPrice', 0); 
            }
            if (localStorage.getItem('maxProductPrice') === undefined || 
                localStorage.getItem('maxProductPrice') === null || 
                parseInt(localStorage.getItem('maxProductPrice')) > response.Price
            ) {
                localStorage.setItem('maxProductPrice', response.Price);
            }
        }); 
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
            eventHub.$emit('filter-price')
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
                    min: parseInt(localStorage.getItem('minProductPrice')),
                    max: parseInt(localStorage.getItem('GreatestProductPrice')),
                    interval: 1,
                    disabled: false,
                    show: true,
                    piecewise: false,
                    lazy: true,
                    value: [
                        parseInt(localStorage.getItem('minProductPrice')),
                        parseInt(localStorage.getItem('maxProductPrice'))
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
    }
}
</script>