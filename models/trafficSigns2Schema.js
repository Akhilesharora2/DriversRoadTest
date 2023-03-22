const mongoose = require('mongoose');

const trafficSigns2Schema = new mongoose.Schema({
    code: {
        type: Number,
        required: true
    },
    image: {
        type: String
    }
})
  
const trafficSigns2 = new mongoose.model("trafficSigns2", trafficSigns2Schema);

module.exports = trafficSigns2;