const { Router } = require('express');

//Controllers
const ItemController = require('./app/Controllers/ItemController');

const routes = new Router();

routes.get('/', ItemController.index);
routes.post('/set-item-active', ItemController.store);
routes.post('/add-item', ItemController.store);

module.exports = routes;