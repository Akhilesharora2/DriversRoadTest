//Middleware will check authetication every time
const jwt = require('jsonwebtoken');
const Admin =  require('../models/adminSchema');

const adminAuthenticate = async (req,res, next) =>{
    try {
        //Get the cookies first
        const token = req.cookies.jwt;
        if(!token){
            res.status(401).send("No Token");
        }else{
            const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
            const rootUser = await Admin.findOne({_id : verifyToken._id, "tokens.token": token});

            if(!rootUser){
                res.status(401).send("User not found")
            }else{
                res.status(200).send("authorized user") 
            }
        }
        next()
    } catch (error) {
        res.status(401).send(error);
        console.log(error);
    }
}

module.exports = adminAuthenticate;