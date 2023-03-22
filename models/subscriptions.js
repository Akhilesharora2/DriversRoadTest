const mongoose = require('mongoose');

// User Schema or Document Structure
const subscriptions = new mongoose.Schema({
    email:{
        type : String,
        required : true
    }
})


//Create Model
const Subscriptions = new mongoose.model("Subscriptions", subscriptions);

module.exports = Subscriptions;