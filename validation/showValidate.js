const yup = require('yup');
let dateRegex = /^(0[1-9]|1\d|2\d|3[01])\.(0[1-9]|1[0-2])\.(19|20)\d{2}$/;;
const showValidation = yup.object({
    show_date : yup.string().required(),
    show1 : yup.number().required(),
    show2 : yup.number().required(),
    show3 : yup.number().required(),
    show4 : yup.number().min(1).max(50).required()
});

module.exports = showValidation;