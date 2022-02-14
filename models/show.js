const express = require('express');
const show = express();
const showRoute = require('../routers/showRouters');

show.use('/show',showRoute);

module.exports = show;