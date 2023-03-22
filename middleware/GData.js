const { json } = require('express');
const Gdb =  require('../models/GSchema');

const GData = async (req, res, next) =>{
    try{
            const result = await Gdb.findOne({name: "G"});
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
module.exports = GData;