const express = require('express');
const router = express.Router();
const showSchema = require('../schema/showSchema');
const seatCountSchema = require('../schema/seatCountSchema');


router.get('/',(req,res)=>{
    showSchema().findAll().then(data=>{
        res.status(200).json(data);
    });
});

router.get('/:date/:show',(req,res)=>{
    let date = req.params.date.split('-');
    let formatedDate = `${date[0]}/${date[1]}/${date[2]}`
    let show = req.params.show;
    seatCountSchema().findOne({
        where : {
            show_date : formatedDate,
            show : show
        }
    }).then(data=>{
        data ? res.status(200).json(data) : res.status(200).json({message : "No shows available on this date!"});
    }).catch(err=>{
        res.status(422).send(err);
    })
})

const generateSeats = (num)=>{
    let seats = [];
    for (let i = 1; i <= num; i++) {
        seats.push(i)
    };
    return JSON.stringify(seats);
}

router.post('/',(req,res)=>{
    let data = req.body;
    let shows = ['show1','show2','show3','show4'];
    let time = ['11.30am','2.30pm','6.30pm','10.30pm']
    let date = req.body.date;
    showSchema().findOne({
        where : {
            date : date
        }
    }).then(response=>{
        if(response){
            res.status(422).json({message : "Shows are already available on "+date})
        }else{
            showSchema().create(data).then(()=>{
                shows.forEach((item,index)=>{
                    let countData = {
                        show : item,
                        show_time : time[index],
                        available : data[item],
                        available_num : generateSeats(data[item]),
                        booked_num : "[]",
                        show_date : date
                    }
                    seatCountSchema().create(countData);
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