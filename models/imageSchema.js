const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    code: {
        type: Number,
        required: true
    },
    image: {
        type: String
    }
})
  
const images = new mongoose.model("images", imageSchema);

module.exports = images;