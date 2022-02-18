const {Sequelize} = require('sequelize');
const dbConfig = require('../config/dbconfig');


const sequelize = new Sequelize(dbConfig.db,dbConfig.username,dbConfig.password,{
    host : dbConfig.host,
    dialect : dbConfig.dialect
});



sequelize.sync({force : false}).then(()=>{
    console.log("Tables Synced Successfully!")
})

module.exports = sequelize;