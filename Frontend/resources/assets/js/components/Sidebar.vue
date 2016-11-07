<template>
    <div class="left-sidebar">
        <h2>Categorieën</h2>
        <div class="panel-group category-products" id="accordian"><!--category-productsr-->
            <div class="panel panel-default" v-for="category in categories">
                <div class="panel-heading">
                    <h4 class="panel-title" v-bind:class="{ 'category-active': category.active }"><a href="#" @click.prevent="selectCategory(category)">{{ category.name }}</a></h4>
                </div>
            </div>
        </div><!--/category-productsr-->

        <div class="price-range"><!--price-range-->
            <h2>Prijs</h2>
            <div class="well">
                <input type="text" class="span2" value="" data-slider-min="0" data-slider-max="600" data-slider-step="5" data-slider-value="[250,450]" id="priceSlider" ><br />
                <b>€ 0</b> <b class="pull-right">€ 600</b>
            </div>
        </div><!--/price-range-->

    </div>
</template>

<script>
    require('./../vendor/bootstrap-slider');

    export default {

        mounted() {
            console.info('Sidebar ready.');

            var priceRange = $('#priceSlider');

            if(priceRange.length) {

                priceRange.slider();

                var RGBChange = function() {
                    $('#RGB').css('background', 'rgb(' + r.getValue() + ',' + g.getValue() + ',' + b.getValue() + ')')
                };
            }
        },

        methods: {
            selectCategory(category) {

                this.categories.forEach(function(category) {
                    category.active = false;
                });

                category.active = true;

                eventHub.$emit('filter-category', category);
            }
        },

        data() {
            return {
                categories: [
                    { _id: "abc3123", name: 'Antiek en Kunst', active: false },
                    { _id: "wejfh3893", name: 'Audio, Tv en Foto', active: false },
                    { _id: "3oiu233", name: 'Auto\'s', active: false },
                    { _id: "ej23kek", name: 'Auto-onderdelen', active: false },
                    { _id: "3iu29ue", name: 'Auto diversen', active: false },
                    { _id: "e2i923", name: 'Boeken', active: false },
                    { _id: "ej892uj", name: 'Caravans en Kamperen', active: false },
                    { _id: "j23893u2", name: 'Caravans en Kamperen', active: false },
                    { _id: "iu82uet2", name: 'Cd\'s en Dvd\'s', active: false }
                ]
            }
        }
    }
</script>