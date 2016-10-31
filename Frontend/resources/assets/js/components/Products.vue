<template>
    <div class="features_items"><!--features_items-->
        <h2 class="title text-center">Producten</h2>
        
        <div class="col-sm-4" v-for="product in products">
            <div class="product-image-wrapper">
                <div class="single-products">
                    <div class="productinfo text-center">
                        <img :src="product.image" :alt="product.name" />
                        <h2>€ {{ product.price }}</h2>
                        <p>{{ product.name }}</p>
                        <a href="#" class="btn btn-default add-to-cart"><i class="fa fa-shopping-cart"></i>In winkelwagen</a>
                    </div>

                </div>
                <div class="choose">
                    <ul class="nav nav-pills nav-justified">
                        <li><a href=""><i class="fa fa-heart"></i>Op verlanglijstje</a></li>
                    </ul>
                </div>
            </div>
        </div>
    </div><!--features_items-->
</template>

<script>
    export default {
        mounted() {
            console.log('Products ready.')
        },

        data() {
            return {
                products: [
                    { name: 'Easy Polo Black Edition', price: 56, image: '/images/shop/product7.jpg' },
                    { name: 'Easy Polo Black Edition', price: 56, image: '/images/shop/product8.jpg' },
                    { name: 'Easy Polo Black Edition', price: 56, image: '/images/shop/product9.jpg' },
                    { name: 'Easy Polo Black Edition', price: 56, image: '/images/shop/product10.jpg' },
                    { name: 'Easy Polo Black Edition', price: 56, image: '/images/shop/product11.jpg' },
                    { name: 'Easy Polo Black Edition', price: 56, image: '/images/shop/product12.jpg' }
                ]
            }
        }
    }
</script>