const express = require('express');
// const { celebrate, Segments, Joi } = require('celebrate');

const routes = express.Router();

/** Controllers */
const ongController = require('./controllers/ongController');

routes.get('/ongs', ongController.index);
routes.post('/ongs', ongController.create);
routes.put('/ongs', ongController.update);

module.exports = routes;