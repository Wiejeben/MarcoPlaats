<template>
    <div class="items"><!--features_items-->
        <h2 class="title text-center">Instellingen</h2>
        <h3>Categorie toevoegen</h3>

        <div class="row">
            <div class="col-sm-12 clearfix">
                <div class="form-one">
                    <form>
                        <input type="text" placeholder="Naam" v-model="categorie.Name">
                        <div id="do_action">
                            <button type="submit" class="btn btn-primary" @click.prevent="submit()">Opslaan</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        mixins: [require('./../../mixins/auth')],
        created() {
            var self = this;
            self._id = location.search.split('id=')[1];
            HasRole('admin', function(){ 
                $.get(apiUrl + '/categories/' + self._id, function(data) {
                    self.categorie = data;
                });
             })
        },
        data() {
            return {
                categorie: {
                    Name: null
                }
            }
        },
        methods:{
            submit(){
                var self = this;
                $.ajax({
                    url: window.apiUrl + '/categories/' + self.categorie._id,
                    type: 'PUT',
                    contentType: 'application/json',
                    data: JSON.stringify(self.categorie),
                    dataType: 'json',
                    success: function(data, status, jqXHR){
                        if(jqXHR.status == 204){
                            NewAlert('success', 'De categorie is succesvol aangemaakt!');
                        } else {
                            NewAlert('error', 'Er is iets fout gegaan');
                        }
                    }
                });
            },
        }
    }
</script>
