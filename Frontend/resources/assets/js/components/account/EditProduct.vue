<template>
    <div class="items"><!--features_items-->
        <h2 class="title text-center">Product aanpassen</h2>
        <form v-if="user !== null && product.Name !== null" class="row">
            <div class="col-sm-6 col-xs-12 shopper-info">
                <h4>Product</h4>
                <input class="form-control" placeholder="Naam"  v-model="product.Name">
                <input class="form-control" placeholder="Prijs"  v-model="product.Price">
                <input class="form-control" placeholder="Quantiteit"  v-model="product.Amount">
                <textarea class="form-control" name="message" v-model="product.Description" placeholder="Omschrijving" rows="9"></textarea>
                <select id="CategorySelect">
                    <option v-for="(category, index) in categories" :selected="hasProduct(category, product._id)" :value="category._id">{{ category.Name }}</option>
                </select>

                <ul>
                    <li v-for="(file, index) in files" :id="'image-'+index">
                        <div class="file_item">
                            <div class="info">
                                <img :src="file.Image" height="100%" width="100%" alt="">
                                <strong>{{ file.Name }} <a href="#" @click.prevent="removeImage(index)" class="red" title="">X</a></strong>
                            </div>
                        </div>
                        <input :id="'file-'+index" type="file" accept="image/*" @change="upload(file, $event)" style="display:none">
                    </li>
                </ul>
                <div class="value_btn">
                    <a href="#" v-on:click="addImage" class="add">
                        <span>Afbeelding toevoegen</span>
                    </a>
                </div>
            </div>
            <div class="col-xs-12">
                <button href="#" class="btn btn-primary" @click.prevent="submit()">Opslaan</button><br><br>
            </div>
        </form>
    </div>
</template>
<script>
    export default {
        mixins: [ require('./../../mixins/auth') ],
        created() {
            var self = this;
            eventHub.$on('user-detected', function(data) {
                self.user = data;
                self.product._id = location.search.split('id=')[1];
                $.get(apiUrl + '/products/' + self.product._id, function(product) {
                    self.product = product
                    self.files = product.Images
                });

                $.get(apiUrl + '/categories', function(categories) {
                    self.categories = categories;
                    if (categories.length != 0) {
                        self.product.Category = categories[0]._id;
                    }
                });
            });

        },
        data() {
            return {
                product: {
                    Name: null,
                    Description: null,
                    Price: null,
                    Amount: null,
                    Images: [],
                    CreatedAt: null,
                    DeletedAt: null,
                    DeliveryMethod: null,
                    Category: null
                },
                files:[],
                user:null,
                categories:[],
            }
        },
        methods:{
            addImage: function(){
                var self = this;
                this.$nextTick(function () {
                    var inputId = "file-" + (this.files.length-1);
                    document.getElementById(inputId).click();
                });  
            },
            removeImage: function(index) {
                var self = this
                delete self.product.Images[index];
                document.getElementById("image-"+index).remove();
            },
            upload: function(file, e){
                var self = this;
                var f = e.target.files[0];
                file.name = f.name;
                var reader = new FileReader();
                reader.onload = function () {
                    var thisImage = reader.result;
                    self.product.Images.push({Name: f.name, Image: thisImage});
                };
                reader.readAsDataURL(f);
            },
            submit() {
                var self = this;
                this.product.Price = parseInt(this.product.Price)
                this.product.Amount = parseInt(this.product.Amount)
                this.product.Images = this.product.Images.filter(function(n){ return n != undefined })
                $.ajax({
                    url: window.apiUrl + '/products/' + self.product._id,
                    type: 'PUT',
                    contentType: 'application/json',
                    data: JSON.stringify(this.product),
                    dataType: 'json',
                    success: function(data, status, jqXHR){
                        if(jqXHR.status == 204){
                            NewAlert('success', 'Product succesvol aangepast!');
                        } else {
                            NewAlert('error', 'Er is iets fout gegaan');
                        }
                    }
                });
            },

            hasProduct(category, productId) {
                var found = false;
                category.ProductIds.forEach(value => {
                    if (value == productId) {
                        found = true;
                    }
                });

                //console.log(category.Name + ': ' + found);
                return found
            }
        }
    }
</script>