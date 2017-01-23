<template>
    <div class="items"><!--features_items-->
        <h2 class="title text-center">Product toevoegen</h2>

        <form v-if="user != null" class="row">

            <div class="col-sm-6 col-xs-12 shopper-info">

                <h4>Product</h4>
                <input class="form-control" placeholder="Name"  v-model="product.Name">
                <input class="form-control" placeholder="Prijs"  v-model="product.Price">
                <input class="form-control" placeholder="Amount"  v-model="product.Amount">
                <textarea name="message" v-model="product.Description" placeholder="Description." rows="9"></textarea>
                <select v-model="product.Category" id="CategorySelect">
                    <option v-for="(category, index) in categories" :selected="index === 0" :value="category._id">{{ category.Name }}</option>
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
        mixins: [ require('./../../mixins/auth') ],
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
                    SellerID: null,
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
                if(this.files.length == 0){
                    this.files.push({ 
                        Name: ""
                    })
                }
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
                var reader = new FileReader();
                reader.onload = function () {
                    var thisImage = reader.result;
                    self.product.Images.push({Name: f.name, Image: thisImage});
                    self.files = self.product.Images;
                }
                reader.readAsDataURL(f);
            },

            submit() {
                var self = this;
                this.product.Price = parseInt(this.product.Price)
                this.product.Amount = parseInt(this.product.Amount)
                this.product.SellerID = this.user._id
                this.product.Images = this.product.Images.filter(function(n){ return n != undefined })
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