const validator = (validator)=> async (req,res,next)=>{
    try {
        await validator.validate(req.body);
        return next();
    } catch (error) {
        res.status(422).json(error.message);
    }
}

module.exports = validator