const StatisticController = require('./../Controllers/StatisticController');

app.get('/statistics/products', (req, res, next) => {
    return new StatisticController(req, res, next).getProducts();
});

app.get('/statistics/category', (req, res, next) => {
    return new StatisticController(req, res, next).getCategories();
});

app.get('/statistics/productordercount', (req, res, next) => {
    return new StatisticController(req, res, next).getProductOrderCount();
});

app.get('/statistics/categoryordercount', (req, res, next) => {
    return new StatisticController(req, res, next).getCategoryOrderCount();
});