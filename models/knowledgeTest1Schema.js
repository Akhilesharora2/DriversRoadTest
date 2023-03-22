const mongoose = require('mongoose');

const KnowledeTest1Schema = new mongoose.Schema({
    code: {
        type: Number,
        required: true
    },
    image: {
        type: String
    }
})
  
const KnowledgeTest1 = new mongoose.model("KnowledgeTest1", KnowledeTest1Schema);

module.exports = KnowledgeTest1;