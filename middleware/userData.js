const User = require('../models/userSchema');
const Admin = require('../models/adminSchema');

const userData = async (req, res, next) =>{
try {
    const userEmail = req.cookies.email;
    if(!userEmail){
        res.status(401).send("No userEmail detected.");
    }else{
        var user = await User.findOne({email: userEmail});
        if(!user){
            user = await Admin.findOne({email: userEmail});
            if(!user){
            res.status(401).send("User not found")
            }else{
                res.status(200).send(user);
            }
        }else{
            res.status(200).send(user);
        }
    }
    next()
} catch (error) {
    res.status(400).send(error);
        console.log(error);
}
}
module.exports = userData;