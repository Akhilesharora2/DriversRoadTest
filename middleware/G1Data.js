const { json } = require('express');
const G1db =  require('../models/G1Schema');

const G1Data = async (req, res, next) =>{
    try{
            const result = await G1db.findOne({name: "G1"});
            if(result){                                        
                res.status(200).send(result);
            }else{
                res.status(401).send("Data not found");
            }
            next()
    }catch(error){
        res.status(401).send(error);
        console.log(error);
    }
}
module.exports = G1Data;