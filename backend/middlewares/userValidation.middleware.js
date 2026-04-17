const {newUserschema} = require("../services/userValidation.service")

function newUserValidation(req, res, next) {
    try {
        let {error} = newUserschema.validate(req.body);

        if(error) {
        let errorMsg = error.details[0].message;
        return res.status(403).json({ message: "Validation error", error: errorMsg });
        }
        next()
    }catch(error) {
        return res.status(400).json({ message: "Validation error", error: error.message });
    }
}



module.exports = {
    newUserValidation
}