<template>
    <div id="header">

        <div class="header_top"><!--header_top-->
            <div class="container">
                <div class="row">
                    <div class="col-sm-6">
                        <div class="contactinfo">
                            <ul class="nav nav-pills">
                                <li><a href="mailto:m.van.noord@hr.nl"><i class="fa fa-envelope"></i> m.van.noord@hr.nl</a></li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="social-icons pull-right">
                            <ul class="nav navbar-nav">
                                <li><a href="https://www.facebook.com/marco.vannoord?fref=ts" target="_blank"><i class="fa fa-facebook"></i></a></li>
                                <li><a href="https://nl.linkedin.com/in/marco-van-noord-01586529"><i class="fa fa-linkedin"></i></a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div><!--/header_top-->

        <div class="header-middle"><!--header-middle-->
            <div class="container">
                <div class="row">
                    <div class="col-sm-4">
                        <div class="logo pull-left">
                            <a href="/"><img src="images/home/logo.png" alt="MarcoPlaats Logo" /></a>
                        </div>
                    </div>
                    <div class="col-sm-8">
                        <div class="shop-menu pull-right">
                            <ul class="nav navbar-nav">
                                <li><a href="#"><i class="fa fa-user"></i> Account</a></li>
                                <li><a href="#"><i class="fa fa-star"></i> Verlanglijstje</a></li>
                                <li><a href="#"><i class="fa fa-shopping-cart"></i> Winkelwagen</a></li>
                                <li><a href="#"><i class="fa fa-lock"></i> Inloggen</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div><!--/header-middle-->

    </div>
</template>

<script>
    export default {
        mounted() {
            console.log('Header ready.')
        }
    }
</script>
