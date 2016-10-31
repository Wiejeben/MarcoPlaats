<template>
    <div class="left-sidebar">
        <h2>Categorieën</h2>
        <div class="panel-group category-products" id="accordian"><!--category-productsr-->
            <div class="panel panel-default" v-for="category in categories">
                <div class="panel-heading">
                    <h4 class="panel-title"><a href="#">{{ category.name }}</a></h4>
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
            console.log('Sidebar ready.');

            var priceRange = $('#priceSlider');

            if(priceRange.length) {

                priceRange.slider();

                var RGBChange = function() {
                    $('#RGB').css('background', 'rgb(' + r.getValue() + ',' + g.getValue() + ',' + b.getValue() + ')')
                };
            }
        },

        data() {
            return {
                categories: [
                    { name: 'Antiek en Kunst' },
                    { name: 'Audio, Tv en Foto' },
                    { name: 'Auto\'s' },
                    { name: 'Auto-onderdelen' },
                    { name: 'Auto diversen' },
                    { name: 'Boeken' },
                    { name: 'Caravans en Kamperen' },
                    { name: 'Caravans en Kamperen' },
                    { name: 'Cd\'s en Dvd\'s' }
                ]
            }
        }
    }
</script>