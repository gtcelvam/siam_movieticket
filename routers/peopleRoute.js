const express = require('express');
const peopleRoute = express.Router();
const SeatCountSchema = require('../schema/seatCountSchema')
const PeopleSchema = require('../schema/personSchema');
const validator = require('../middleware/validate');
const personValidate = require('../validation/personValidate');


peopleRoute.post('/bookticket',validator(personValidate),(req,res)=>{
    let date = req.body.show_date;
    let show = req.body.show;
    let seat_num = JSON.parse(req.body.seat_num);
    let available_num;
    let showid;
    SeatCountSchema.findOne({
        where : {
            show_date : date,
            show : show
        }
    }).then(data=>{
        showid = data.id
        available_num = data && JSON.parse(data.available_num);
        booked_num = data && available_num.filter((value,index)=>{
             if(seat_num.includes(value)){
                 return value;
             }
        });
        booked_num.forEach(e=>{
           const i = available_num.indexOf(e);
           i > -1 && available_num.splice(i,1);
        });
        if(seat_num.length !== booked_num.length){
            //res.json(booked_num);
            res.status(422).json({message : "Not all the seat numbers availble for now!"})
        }else{
            let peopleData = {...req.body,showid}
            PeopleSchema.create(peopleData).then(()=>{
                let totalBookedNum = JSON.parse(data.booked_num);
                booked_num.map(item=>{
                    totalBookedNum.push(item);
                })
                let updatedData = {
                    available : data.available - booked_num.length,
                    booked : data.booked + booked_num.length,
                    available_num : JSON.stringify(available_num),
                    booked_num : JSON.stringify(totalBookedNum),
                }
                SeatCountSchema.update(updatedData,{
                    where : {
                        show_date : date,
                        show : show
                    }
                }).then(()=>{
                    res.status(200).json({message : "Seats Booked Successfully!"});
                }).catch(err=>{
                    console.log("Booking Error : "+err);
                })
            }).catch(err=>{
                res.status(422).json("Booking Error : "+err);
            });
        }
    }).catch(err=>{
        res.status(422).send("Seat Count Error : "+err);
    })
});

let person , show_date;
peopleRoute.get('/:id',(req,res)=>{
    let id = req.params.id;
    PeopleSchema.findOne({
        attributes :['name','show','total_seats','seat_num'],
        where : {
            id : id
        },
        //include : SeatCountSchema
        include : [{
            model : SeatCountSchema,
            required : true,
            attributes : ['show_time','show_date']
        }]
    }).then(data =>{
        data ? res.status(200).json(data) : res.status(200).send({message : "No Data Available!"});
    })
})

peopleRoute.delete('/cancel/:id',(req,res)=>{
    let id = req.params.id;
    let showid,show,seat_num,available_num,booked_num;
    PeopleSchema.findOne({where : {
        id : id
    }}).then(data=>{
        if(!data){
            res.status(422).json({message : 'No Records Found!'})
        }else{
            show = data.show;
            showid = data.showid;
            seat_num = JSON.parse(data.seat_num);
            SeatCountSchema.findOne({
                where : {
                    id : showid,
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
                await PeopleSchema.destroy({
                    where : {
                        id : id
                    }
                });
                await SeatCountSchema.update(updatedDate,{
                    where : {
                        id : showid,
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