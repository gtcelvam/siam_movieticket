const express = require('express');
const { db } = require('./config/dbconfig');
const app = express();
const sequelize = require('./models/server');
const show = require('./models/show');
const people = require('./models/people');

//Middleware
app.use(express.json());

sequelize.authenticate().then(async ()=>{
    console.log("DB Connected Successfully!");
}).catch((err)=>{
    console.log('Error : '+err);
})

app.use(show);
app.use(people);

const port = process.env.port || 3000;
app.listen(port,()=>{
    console.log("Listening On Port "+port);
})