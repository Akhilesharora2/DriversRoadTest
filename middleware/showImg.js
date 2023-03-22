const knowledgeTest1 = require('../models/knowledgeTest1Schema');
const trafficSigns2 = require('../models/trafficSigns2Schema');
const exam1 = require('../models/exam1Schema');
const exam2 = require('../models/exam2Schema');
const exam3 = require('../models/exam3Schema');
const images = require('../models/imageSchema');

const showImg = async (req, res, next) => {
    try {
            const db = req.query.img;
            var Images;
        if(db === 'P1'){
             Images =await knowledgeTest1.find();
        }else if(db === 'P2'){
             Images =await trafficSigns2.find();
        }else if(db === 'E1'){
             Images =await exam1.find();
        }else if(db === 'E2'){
             Images =await exam2.find();
        }else if(db === 'E3'){
             Images =await exam3.find();
        }else if(db === 'Final'){
             Images =await images.find();
        }else{
            console.log('Check your url params for showImg' , db);
        }
        if (Images) {
            res.status(200).send(Images);
        } else {
            res.status(401).send("Data not found");
        }
        next()
    } catch (error) {
        res.status(400).send(error);
    }
}
module.exports = showImg;