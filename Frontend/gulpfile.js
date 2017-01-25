global.elixir = require('laravel-elixir');

require('laravel-elixir-vue-2');
require('laravel-elixir-env');

elixir(mix => {
    mix.sass('app.scss')
        .webpack('app.js');
});
