const {DataTypes} = require('sequelize');
const sequelize = require('../models/server');
const SeatCountSchema = require('./seatCountSchema');
const PersonSchema = require('./personSchema')

const ShowSchema = sequelize.define('shows',{
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
        show_date : {
            type : DataTypes.STRING,
            allowNull : false,
            primaryKey : true
        }
});

ShowSchema.hasMany(SeatCountSchema,{foreignKey : 'show_date',as : 'showcount'});
SeatCountSchema.belongsTo(ShowSchema,{foreignKey  :'show_date',as : 'showcount'})
//Problem with  Naming collision between attribute 'show' and association 'show' on model seat_counts.
//SeatCountSchema.belongsTo(ShowSchema,{foreignKey : 'show_date'})


module.exports = ShowSchema;