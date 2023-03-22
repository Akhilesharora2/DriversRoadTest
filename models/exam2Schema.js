const mongoose = require('mongoose');

const exam2Schema = new mongoose.Schema({
    code: {
        type: Number,
        required: true
    },
    image: {
        type: String
    }
})
  
const exam2 = new mongoose.model("exam2", exam2Schema);

module.exports = exam2;