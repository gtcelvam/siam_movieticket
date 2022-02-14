const {DataTypes} = require('sequelize');
const sequelize = require('../models/server');
const seatCountSchema = require('./seatCountSchema');

const showSchema = ()=>{
   const schema = sequelize.define('shows',{
        id : {
            type : DataTypes.INTEGER,
            allowNull : false,
            autoIncrement : true,
            unique : true
        },
        show1 : {
            type : DataTypes.INTEGER,
            allowNull : false,
            defaultValue : 50
        },
        show2 : {
            type : DataTypes.INTEGER,
            allowNull : false,
            defaultValue : 50
        },
        show3 : {
            type : DataTypes.INTEGER,
            allowNull : false,
            defaultValue : 50
        },
        show4 : {
            type : DataTypes.INTEGER,
            allowNull : false,
            defaultValue : 50
        },
        date : {
            type : DataTypes.STRING,
            allowNull : false,
            primaryKey : true
        }
    });
    /* schema.sync({force:false}).then(async ()=>{
        console.log("Show Tables Synced!");
        await seatCountSchema();
    }).catch(err=>{
        console.log('Error : '+err);
    }); */
    return schema;
} 


module.exports = showSchema;