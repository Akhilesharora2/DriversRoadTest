const mongoose = require('mongoose');

// User Schema or Document Structure
const GSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    GOverview : {
        type : String,
        required : false,                
    }
})


//Create Model
const GData = new mongoose.model("GData", GSchema);

module.exports = GData;