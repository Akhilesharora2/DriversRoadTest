const mongoose = require('mongoose');

// User Schema or Document Structure
const G1Schema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    G1Overview : {
        type : String,
        required : false,                
    },
    P1: {
        type: Array,
        required: false    
    },
    P2 :{
        type: Array,
        required: false
    },
    Exam1:{
        type : Array,
        required : false
    },
    Exam2:{
        type : Array,
        required : false
    },
    Exam3:{
        type : Array,
        required : false
    },
    Final:{
        type : Array,
        required : false
    }
})


//Create Model
const G1Data = new mongoose.model("G1Data", G1Schema);

module.exports = G1Data;