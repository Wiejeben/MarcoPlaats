<template>
    <section id="form">
        <div class="container">
            <div class="row">
                <div class="col-md-2 col-md-offset-5">
                    <h2>Settings</h2>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
    export default {
        mixins: [require('./../../mixins/location.js')],
        created() {
            this.currentLocation = this.getCurrentAdress()
        }
    }
</script>