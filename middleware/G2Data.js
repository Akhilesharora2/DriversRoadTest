const { json } = require('express');
const G2db =  require('../models/G2Schema');

const G2Data = async (req, res, next) =>{
    try{
            const result = await G2db.findOne({name: "G2"});
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
module.exports = G2Data;