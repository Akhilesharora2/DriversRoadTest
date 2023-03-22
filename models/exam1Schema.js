const mongoose = require('mongoose');

const exam1Schema = new mongoose.Schema({
    code: {
        type: Number,
        required: true
    },
    image: {
        type: String
    }
})
  
const exam1 = new mongoose.model("exam1", exam1Schema);

module.exports = exam1;