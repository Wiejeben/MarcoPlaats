<template>
    <div class="items"><!--features_items-->
        <h2 class="title text-center">Product toevoegen</h2>

        <form v-if="user != null" class="row">

            <div class="col-sm-6 col-xs-12 shopper-info">

                <h4>Product toevoegen</h4>
                <input class="form-control" placeholder="Name"  v-model="product.Name">
                <input class="form-control" placeholder="Prijs"  v-model="product.Price">
                <input class="form-control" placeholder="Amount"  v-model="product.Amount">
                <textarea name="message" v-model="product.Description" placeholder="Description." rows="9"></textarea>
                <select v-model="product.Category" id="CategorySelect">
                    <option v-for="(category, index) in categories" :selected="index === 0" :value="category._id">{{ category.Name }}</option>
                </select>
                <ul>
                    <li v-for="(file, index) in files">
                        <div class="file_item">
                            <div class="info">
                                <strong>{{file.name}}</strong>
                                <p>{{file.size}}kb</p>
                            </div>
                        </div>
                        <input :id="'file-'+index" type="file" accept="image/*" @change="upload(file, $event)" style="display:none">
                    </li>
                </ul>
                <div class="value_btn">
                    <a href="#" v-on:click="addImage" class="add">
                        <span>Add Image</span>
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
        mixins: [
            require('./../../mixins/location.js'), 
            require('./../../mixins/auth')
        ],
        created() {
            var self = this;

            eventHub.$on('user-detected', function(data) {
                self.user = data;
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
                    // {Filename}
                    CreatedAt: null,
                    DeletedAt: null,
                    DeliveryMethod: null,
                    Category: null
                },
                user:null,
                categories:[],
                files:[]
            }
        },
        methods:{
            addImage: function(){
                var self = this;
                this.files.push({ 
                    name: "", size: 0
                })
                this.$nextTick(function () {
                    var inputId = "file-" + (this.files.length-1);
                    document.getElementById(inputId).click();
                });  
            },
            upload: function(file, e){
                var self = this;
                var f = e.target.files[0];
                file.name = f.name;
                file.size = (f.size / 1024).toFixed(2);
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
                $.ajax({
                    url: window.apiUrl + '/products',
                    type: 'POST',
                    contentType: 'application/json',
                    data: JSON.stringify(this.product),
                    dataType: 'json',
                    success: function(data) {
                        if(data){
                            NewAlert('success', 'Product succesvol toegevoegd!');
                        } else {
                            NewAlert('error', 'Er is iets fout gegaan');
                        }
                    }
                });
            }
        }
    }
</script>