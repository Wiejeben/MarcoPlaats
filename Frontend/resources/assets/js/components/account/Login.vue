<template>
    <section id="form"><!--form-->
        <div class="container">
            <div class="row">
                <div class="col-sm-4 col-sm-offset-1">
                    <div class="login-form"><!--login form-->
                        <h2>Inloggen</h2>
                        <form action="#">
                            <input type="email" placeholder="E-mailadres">
                            <input type="password" placeholder="Wachtwoord">
                            <button type="submit" class="btn btn-default">Inloggen</button>
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
                            <input name="firstName" placeholder="Voornaam">
                            <input name="lastName" placeholder="Achternaam">
                            <input name="emailAddress"  type="email" placeholder="E-mailadres">
                            <input name="password"  type="password" placeholder="Wachtwoord">
                            <input name="passwordRepeat" type="password" placeholder="Herhaal wachtwoord">
                            <button type="submit" class="btn btn-default">Registreren</button>
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
        }
    }
</script>