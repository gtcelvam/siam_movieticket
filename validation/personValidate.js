const yup = require('yup');
let dateRegex = /^(0[1-9]|1\d|2\d|3[01])\.(0[1-9]|1[0-2])\.(19|20)\d{2}$/;;
const personValidate = yup.object({
    name:yup.string().required(),
	show:yup.string().required(),
	total_seats:yup.number().min(1).required(),
	seat_num:yup.string().required(),
	show_date:yup.string().required()
});

module.exports = personValidate