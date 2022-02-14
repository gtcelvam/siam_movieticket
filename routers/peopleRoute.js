const express = require('express');
const peopleRoute = express.Router();
const seatCountSchema = require('../schema/seatCountSchema')
const peopleSchema = require('../schema/personSchema');
const personSchema = require('../schema/personSchema');

peopleRoute.post('/bookticket',(req,res)=>{
    let date = req.body.show_date;
    let show = req.body.show;
    let seat_num = JSON.parse(req.body.seat_num);
    let available_num;
    let booked_num;

    let seatCount, people ;

    seatCountSchema().findOne({
        where : {
            show_date : date,
            show : show
        }
    }).then(data=>{
        /* {
            where : {
                show_date : date,
                show : show
            }
        } */
        seatCount = data;
        return peopleSchema().getTableName()
    }).then((data)=>{
        res.status(200).send(data);
    })
    .catch(err=>{
        res.status(422).send("Error : "+err);
    })
});

let person , show_date;
peopleRoute.get('/:id',(req,res)=>{
    let id = req.params.id;
    peopleSchema().findOne({
        where : {
            id : id
        },
        //include : seatCountSchema()
        include : [{
            model : seatCountSchema(),
            required : true
        }]
    }).then(data =>{
        person = data;
        res.status(200).json(person);
    })
})

peopleRoute.delete('/cancel/:id',(req,res)=>{
    let id = req.params.id;
    let date,show,seat_num,available_num,booked_num;
    peopleSchema().findOne({where : {
        id : id
    }}).then(data=>{
        if(!data){
            res.status(422).json({message : 'No Records Found!'})
        }else{
            date = data.show_date;
            show = data.show
            seat_num = JSON.parse(data.seat_num);
            seatCountSchema().findOne({
                where : {
                    show_date : date,
                    show : show
                }
            }).then( async elem =>{
                available_num = JSON.parse(elem.available_num);
                booked_num = JSON.parse(elem.booked_num);
                seat_num.map(item=>{
                    let i;
                    available_num.push(item);
                    i = booked_num.indexOf(item);
                    i > -1 && booked_num.splice(i,1);
                });
                let updatedDate = {
                    available : available_num.length,
                    booked : booked_num.length,
                    available_num : JSON.stringify(available_num),
                    booked_num : JSON.stringify(booked_num)
                }
                await peopleSchema().destroy({
                    where : {
                        id : id
                    }
                });
                await seatCountSchema().update(updatedDate,{
                    where : {
                        show_date : date,
                        show : show
                    }
                })
            }).then(() =>{
                res.status(200).json({message : "Ticket Canceled Successfully!"});
            }).catch(err=>{
                res.status(422).send("Cancel Error : "+err);
            })
        }
    })
})

module.exports = peopleRoute;