<template>
    <div>
        <div v-if="product !== false">
            <div class="product-details"><!--product-details-->
                <div class="col-sm-3">
                    <div class="view-product">
                        <img v-if="product.Images.length > 0" :src="product.Images[0].Image" :alt="product.Name">
                        <img v-else src="/images/product-placeholder.jpg" :alt="product.Name" />
                    </div>
                </div>
                <div class="col-sm-9">
                    <div class="product-information"><!--/product-information-->
                        <h2>{{ product.Name }}</h2>
                        <p>Web ID: {{ product._id }}</p>
                        <span>
                            <span>&euro; {{ product.Price }},-</span>
                            <label>Aantal:</label>
                            <input type="number" value="1" />
                            <button type="button" class="btn btn-fefault cart">
                                <i class="fa fa-shopping-cart"></i>
                                In winkelwagen
                            </button>
                        </span>
                        <p><b>Beschikbaarheid:</b> {{ product.Amount }}</p>
                    </div><!--/product-information-->
                </div>
            </div><!--/product-details-->

            <div class="category-tab shop-details-tab"><!--category-tab-->
                <div class="col-sm-12">
                    <ul class="nav nav-tabs">
                        <li class="active"><a href="#details" data-toggle="tab">Omschrijving</a></li>
                        <!--<li><a href="#reviews" data-toggle="tab">Reviews (5)</a></li>-->
                    </ul>
                </div>
                <div class="tab-content container">
                    <div class="tab-pane fade active in" id="details" >
                        <p>{{ product.Description }}</p>
                    </div>
                    <!--<div class="tab-pane" id="reviews" >-->
                        <!--<div class="col-sm-12">-->
                            <!--<ul>-->
                                <!--<li><a href=""><i class="fa fa-user"></i>EUGEN</a></li>-->
                                <!--<li><a href=""><i class="fa fa-clock-o"></i>12:41 PM</a></li>-->
                                <!--<li><a href=""><i class="fa fa-calendar-o"></i>31 DEC 2014</a></li>-->
                            <!--</ul>-->
                            <!--<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>-->
                            <!--<p><b>Write Your Review</b></p>-->

                            <!--<form action="#">-->
                                            <!--<span>-->
                                                <!--<input type="text" placeholder="Your Name"/>-->
                                                <!--<input type="email" placeholder="Email Address"/>-->
                                            <!--</span>-->
                                <!--<textarea name="" ></textarea>-->
                                <!--<b>Rating: </b> <img src="images/product-details/rating.png" alt="" />-->
                                <!--<button type="button" class="btn btn-default pull-right">-->
                                    <!--Submit-->
                                <!--</button>-->
                            <!--</form>-->
                        <!--</div>-->
                    <!--</div>-->

                </div>
            </div><!--/category-tab-->
        </div>
        <div v-else>
            <div v-if="found === null">
                <h2>Bezig met laden</h2>
            </div>
            <div v-else>
                <h2>404 product niet gevonden</h2>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        mounted() {
            console.info('Product detail ready.');

            var that = this,
                id = location.search.split('id=')[1];

            $.get(apiUrl + '/products/' + id, function(product) {
                that.found = true;
                that.product = product;
            })
            .fail(function() {
                that.found = false;
            });
        },

        data() {
            return {
                product: false,
                found: null
            }
        }
    }
</script>
