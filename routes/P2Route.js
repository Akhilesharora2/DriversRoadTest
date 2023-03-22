const express = require('express');
const router = express.Router();

const cors = require('cors');
const multer = require('multer');
router.use(cors());

var datetime = new Date();
var dateTime = datetime.toISOString().replace(/:/g, '-');

//UThese methods are used to parse body data like req.body....
    const cookieParser = require('cookie-parser');
    // These mehtods are used to get data and cookies from front-end
    router.use(express.json());
    router.use(express.urlencoded({ extended: false }));
    router.use(cookieParser());

//storing images using multer
const storage = multer.diskStorage({
    destination: (req, File, callback) => {
        callback(null, '../driveroadtest/public/TrafficSigns')
    },
    filename: (req, file, callback) => {
        callback(null, dateTime +'_'+ file.originalname);
    }
})

//to delete images from db
const fs = require('fs')
const { promisify } = require('util')

const unlinkAsync = promisify(fs.unlink)
//upload to import images into public/upload folder
const upload = multer({ storage: storage });


//Require Model
const G1db = require('../models/G1Schema');
const images = require('../models/trafficSigns2Schema');

const { Code } = require('mongodb');

//Add Images into the database
router.post('/imageUpload', upload.single("stmtImage"), async (req, res) => {
    try {
        const newImage = new images({
            code: req.body.code,
            image: req.file.filename
        });
        const uploaded = await newImage.save();
        console.log(uploaded);
        res.status(200).send("Sent");
    } catch (error) {
        res.status(400).send(error);
    }
});
//Add only id into database without the image
router.post('/imageUploadCode', async (req, res) => {
    console.log( req.body.code);
    try {
        const newImage = new images({
            code: req.body.code,
            image: " "
        });
        const uploaded = await newImage.save();
        console.log(uploaded);
        res.status(200).send("Sent")
    } catch (error) {
        res.status(400).send(error);
    }
})
//update images as well
router.put('/imageUpdate/:code', upload.single("stmtImage"), async (req, res) => {
    try {
        const code = Number(req.params.code);
        const imgupd = await images.findOne({ code: req.body.code }, (err, image) => {   
            if(image.image !== ' '){
        fs.unlinkSync(`${__dirname}/../../driveroadtest/public/TrafficSigns/${image.image}`);
            }
        image.image = req.file.filename;
        image.save();
    });  
        res.status(200);
    } catch (error) {
        res.status(400).send(error);
    }
})
//Delete images
router.put("/deleteImages/:code", async (req, res) => {
    try {
        
        console.log("${__dirname}/../../driveroadtest/public/TrafficSigns/${image.image}");
        const code = Number(req.params.code);
        const deleting = await images.findOne({ code: code }, (err, image) => {
            fs.unlinkSync(`${__dirname}/../../driveroadtest/public/TrafficSigns/${image.image}`);
            image.image = " ";
            image.save();
        })
        res.status(200);
    } catch (error) {
        res.status(400).send(error);
    }
})
//Delete image Doc
router.delete("/deleteImageDoc", async (req, res) => {
    console.log("id:" , req.query.id.trim());
    try {
        const deleteImageDoc = await images.findOneAndDelete({_id: req.query.id.trim()});        
        if(!deleteImageDoc){
            res.status(404).send({message: "Resource not Found!!"});
        }
        res.status(200);
    } catch (error) {
        res.status(400).send(error);
    }
})

//update Code only
router.put('/imageUpdateMany/:code', async (req, res) => {
    try {        
        const num = Number(req.params.code);
        await images.updateMany(
            { code : { $gt: num } },
            { $inc: { code: -1 } },
            {multi: true}
        )
        res.status(200);
    } catch (error) {
        res.status(400).json({status: 400, message: '/imageUpdateMany/:code'});
    }
})





module.exports = router;