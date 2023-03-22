const mongoose = require('mongoose');

// User Schema or Document Structure
const G2Schema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    G2Overview : {
        type : String,
        required : false,                
    }
})


//Create Model
const G2Data = new mongoose.model("G2Data", G2Schema);

module.exports = G2Data;