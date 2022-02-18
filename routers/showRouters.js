const express = require('express');
const router = express.Router();
const ShowSchema = require('../schema/showSchema');
const SeatCountSchema = require('../schema/seatCountSchema');
const validator = require('../middleware/validate');
const showValidator = require('../validation/showValidate');


router.get('/',(req,res)=>{
    ShowSchema.findAll().then(data=>{
        res.status(200).json(data);
    });
});

router.get('/:date/:show',(req,res)=>{
    let date = req.params.date.split('-');
    let formatedDate = `${date[0]}/${date[1]}/${date[2]}`
    let show = req.params.show;
    SeatCountSchema.findOne({
        attributes :{
            exclude: ['createdAt', 'updatedAt']
        },
        where : {
            show_date : formatedDate,
            show : show
        },
        include :[{
            model : ShowSchema,
            as : 'showcount',
            required : true,
            attributes : {
                exclude : ['id',,'show_date','createdAt', 'updatedAt']
            }
        }]
    }).then(data=>{
        //res.status(200).json(data)
        data ? res.status(200).json(data) : res.status(200).json({message : "No shows available on this date!"});
    }).catch(err=>{
        res.status(422).send(" Show Data Error : "+ err);
    })
})

const generateSeats = (num)=>{
    let seats = [];
    for (let i = 1; i <= num; i++) {
        seats.push(i)
    };
    return JSON.stringify(seats);
}

router.post('/',validator(showValidator),(req,res)=>{
    let data = req.body;
    let shows = ['show1','show2','show3','show4'];
    let time = ['11.30am','2.30pm','6.30pm','10.30pm']
    let date = req.body.show_date;
    ShowSchema.findOne({
        where : {
            show_date : date
        }
    }).then(response=>{
        if(response){
            res.status(422).json({message : "Shows are already available on "+date})
        }else{
            ShowSchema.create(data).then(()=>{
                shows.forEach((item,index)=>{
                    let countData = {
                        show : item,
                        show_time : time[index],
                        available : data[item],
                        available_num : generateSeats(data[item]),
                        booked_num : "[]",
                        show_date : date
                    }
                    SeatCountSchema.create(countData);
                })
            }).then(()=>{
                res.status(200).json({message : "Show Added Successfully!"});
            }).catch(err=>{
                res.status(422).send(err);
            })
        }
    })
})

module.exports = router