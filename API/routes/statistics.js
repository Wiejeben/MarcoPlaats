const StatisticController = require('./../Controllers/StatisticController');

app.get('/statistics/products', (req, res, next) => {
    return new StatisticController(req, res, next).getProducts();
});

app.get('/statistics/category', (req, res, next) => {
    return new StatisticController(req, res, next).getCategories();
});