const mongoose = require('mongoose');

const exam3Schema = new mongoose.Schema({
    code: {
        type: Number,
        required: true
    },
    image: {
        type: String
    }
})
  
const exam3 = new mongoose.model("exam3", exam3Schema);

module.exports = exam3;