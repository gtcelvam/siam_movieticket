const {DataTypes} = require('sequelize');
const sequelize = require('../models/server');
const PersonSchema = require('../schema/personSchema');

const SeatCountSchema = sequelize.define('seat_counts',{
        id : {
            type : DataTypes.INTEGER,
            allowNull : false,
            autoIncrement : true,
            primaryKey : true
        },
        show : {
            type : DataTypes.STRING,
            allowNull : false
        },
        show_time : {
            type : DataTypes.STRING,
            allowNull : false
        },
        available : {
            type : DataTypes.INTEGER,
            allowNull : false,
            defaultValue : 0
        },
        booked : {
            type : DataTypes.INTEGER,
            allowNull : false,
            defaultValue : 0
        },
        available_num :{
            type : DataTypes.STRING,
            allowNull : false
        },
        booked_num :{
            type : DataTypes.STRING,
            allowNull : false
        }
    });

SeatCountSchema.hasMany(PersonSchema,{foreignKey : 'showid',onDelete : "CASCADE"});
PersonSchema.belongsTo(SeatCountSchema,{foreignKey : 'showid',onDelete : "CASCADE"})
module.exports = SeatCountSchema;