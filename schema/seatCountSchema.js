const {DataTypes} = require('sequelize');
const sequelize = require('../models/server');

const seatCountSchema = ()=>{
   const schema = sequelize.define('seat_counts',{
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
        },
        show_date : {
            type : DataTypes.STRING,
            allowNull:false,
            references : {
                model : 'shows',
                key:'date'
            },
            unique : true
        }
    });
    
    /* schema.sync({force:false}).then(async ()=>{
        
        console.log("Seat Count Synced!");
    }).catch(err=>{
        console.log('Seat Count Error : '+err)
    }); */

    return schema
};


module.exports = seatCountSchema;