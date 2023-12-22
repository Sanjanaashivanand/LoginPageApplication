const User = require('../models/userModel')

//Get By Id
exports.getUserById = (req, res, next, id) => {
    User.findById(id).exec((err, user)=>{ 
        if(err || !user){
            return res.status(400).json({
                error: "User not found",
            })
        }
        req.profile = user;
        next();
    })
}

exports.getUser = (req, res) => {
    req.profile.salt = undefined;
    req.profile.encry_password = undefined;
    req.profile.createdAt = undefined;
    req.profile.__v = undefined;
    req.profile.updatedAt = undefined;
    return res.json(req.profile);
}
    