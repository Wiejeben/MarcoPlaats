<template>
    <div id="header">
        <div class="header_top"><!--header_top-->
            <div class="container">
                <div class="row">
                    <div class="col-sm-6">
                        <div class="contactinfo">
                            <ul class="nav nav-pills">
                                <li><a href="mailto:info@marcoplaats.nl"><i class="fa fa-envelope"></i> info@marcoplaats.nl</a></li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="social-icons pull-right">
                            <ul class="nav navbar-nav">
                                <li><a href="#"><i class="fa fa-facebook"></i></a></li>
                                <li><a href="#"><i class="fa fa-twitter"></i></a></li>
                                <li><a href="#"><i class="fa fa-linkedin"></i></a></li>
                                <li><a href="#"><i class="fa fa-dribbble"></i></a></li>
                                <li><a href="#"><i class="fa fa-google-plus"></i></a></li>
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
                            <a href="/">
                                <img src="/images/logo.svg" alt="" height="70px" width="260px" />
                            </a>
                        </div>
                    </div>
                    <div class="col-sm-8">
                        <div class="shop-menu pull-right">
                            <ul class="nav navbar-nav">
                                <li><a href="/cart"><i class="fa fa-shopping-cart"></i> Winkelwagentje</a></li>

                                <li v-if="isAdmin"><a href="/admin/users"><i class="fa fa-pencil-square"></i> Beheer</a></li>

                                <li v-if="loggedIn"><a href="/account"><i class="fa fa-user"></i> Account</a></li>
                                <li v-if="loggedIn"><a href="/account/wishlist.html"><i class="fa fa-star"></i> Verlanglijstje</a></li>
                                <li v-if="loggedIn"><a href="/account/logout.html"><i class="fa fa-sign-out"></i> Uitloggen</a></li>

                                <li v-if="!loggedIn"><a :href="apiUrl + '/auth'"><i class="fa fa-lock"></i> Inloggen</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="messages">
                </div>
            </div>
        </div><!--/header-middle-->

    </div>
</template>

<script>
    export default {
        mounted() {
            eventHub.$on('user-detected', this.setUser)
        },

        computed: {
            loggedIn() {
                return this.user != null;
            },

            isAdmin() {
                if (this.loggedIn)
                {
                    return this.user.Role == 'admin';
                }
            }
        },

        data() {
            return {
                user: null,
                apiUrl: window.apiUrl
            }
        },

        methods: {
            setUser(user) {
                this.user = user;
            }
        }
    }
</script>
