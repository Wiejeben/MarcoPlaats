<template>
    <div class="items"><!--features_items-->
        <h2 class="title text-center">Instellingen</h2>

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

                <!--<ul>
                <li v-for="image in product.Images">
                    <div class="Image_item">
                    <div class="info">
                        <strong>{{image.name}}</strong>
                        <p>{{image.size | kb}}</p>
                    </div>
                    </div>
                    <input :id="image-$index" type="image" accept="image/*" @change="upload(Image, $event)" style="display:none">
                </li>
                </ul>
                <div class="value_btn">
                <a href="#" v-on:click="addImage" class="add">
                    <span>Add Image</span>
                </a>
                </div>
            </div>-->

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
                    self.product.Category = categories[0]._id;
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
                categories:[]
            }
        },
        methods:{
            // addImage: function(){
            // this.product.Images.push({ filename: ""})
            //     this.$nextTick(function () {
            //         var inputId = "file-" + (this.files.length-1);
            //         document.getElementById(inputId).click();
            //     });  
            // },
            // upload: function(file, e){
            // var f = e.target.files[0];
            // file.name = f.name;
            // },
            submit() {
                var self = this;
                console.log(self.product);
                $.ajax({
                    url: window.apiUrl + '/products',
                    type: 'POST',
                    contentType: 'application/json',
                    data: JSON.stringify(this.product),
                    dataType: 'json',
                    success: function(data) {
                        if(data){
                            self.newAlert('success', 'Uw instellingen zijn succesvol aangepast!');
                        } else {
                            self.newAlert('error', 'Er is iets fout gegaan');
                        }
                    }
                });
            }
        }
    }
</script>