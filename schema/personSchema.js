const {DataTypes} = require('sequelize');
const sequelize = require('../models/server');
const ShowSchema = require('./showSchema');

const PersonSchema = sequelize.define('people',{
        id : {
            type : DataTypes.INTEGER,
            allowNull : false,
            autoIncrement:true,
            primaryKey : true
        },
        name : {
            type : DataTypes.STRING,
            allowNull : false
        },
        show : {
            type : DataTypes.ENUM("show1","show2","show3","show4"),
            allowNull : false
        },
        total_seats : {
            type : DataTypes.INTEGER,
            allowNull : false
        },
        seat_num : {
            type : DataTypes.STRING,
            allowNull : false
        },
    });


module.exports = PersonSchema;