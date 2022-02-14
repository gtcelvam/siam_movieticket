const {DataTypes} = require('sequelize');
const sequelize = require('../models/server');
const seatCountSchema = require('./seatCountSchema');

const personSchema = ()=>{
    const schema = sequelize.define('people',{
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
        show_date : {
            type : DataTypes.STRING,
            references : {
                model : 'shows',
                key : 'date'
            },
            primaryKey : true
        }
    });
    seatCountSchema().hasMany(schema,{foreignKey : 'show_date'});
    schema.belongsTo(seatCountSchema(),{foreignKey : 'show_date'});
    /* schema.sync({force : false}).then(()=>{
        console.log('people Table Synced!')
    }).catch(err=>{
        console.log('people Error : '+err)
    }) */
    return schema;
}
module.exports = personSchema;