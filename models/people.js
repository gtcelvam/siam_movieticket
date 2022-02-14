const express = require('express');
const people = express();
const peopleRoute = require('../routers/peopleRoute');

people.use('/people',peopleRoute);

module.exports = people;