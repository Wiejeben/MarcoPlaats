<template>
    <section id="form"><!--form-->
        <div class="container">
            <div class="row">
                <div class="col-sm-4 col-sm-offset-1">
                    <div class="login-form"><!--login form-->
                        <h2>Inloggen</h2>
                        <form action="#">
                            <input name="email" v-model="login.email" type="email" placeholder="E-mailadres">
                            <input name="password" v-model="login.password" type="password" placeholder="Wachtwoord">
                            <button type="submit" class="btn btn-default" @click.prevent="login">Inloggen</button>
                        </form>
                    </div><!--/login form-->
                </div>
                <div class="col-sm-1">
                    <h2 class="or">OF</h2>
                </div>
                <div class="col-sm-4">
                    <div class="signup-form"><!--sign up form-->
                        <h2>Registreren</h2>
                        <form action="#">
                            <input name="firstName" v-model="register.firstName" placeholder="Voornaam">
                            <input name="lastName" v-model="register.lastName" placeholder="Achternaam">
                            <input name="email" v-model="register.email" type="email" placeholder="E-mailadres">
                            <input name="password" v-model="register.password" type="password" placeholder="Wachtwoord">
                            <input name="passwordRepeat" v-model="register.passwordRepeat" type="password" placeholder="Herhaal wachtwoord">
                            <button type="submit" class="btn btn-default" @click.prevent="register">Registreren</button>
                        </form>
                    </div><!--/sign up form-->
                </div>
            </div>
        </div>
    </section><!--/form-->
</template>

<script>
    export default {
        mounted() {
            console.log('Login ready.')
        },

        data() {
            return {
                login: {
                    email: '',
                    password: ''
                },

                register: {
                    firstName: '',
                    lastName: '',
                    email: '',
                    password: '',
                    passwordRepeat: ''
                }
            }
        },

        methods: {
            /**
             * Submit login form.
             */
            login() {
                console.log(this.login.email);
                console.log(this.login.password);
            },

            /**
             * Submit register form.
             */
            register() {
                console.log(this.register.firstName);
                console.log(this.register.lastName);
                console.log(this.register.email);
                console.log(this.register.password);
                console.log(this.register.passwordRepeat);

            }
        }
    }
</script>