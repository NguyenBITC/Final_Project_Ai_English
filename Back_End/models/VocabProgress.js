const mongoose = require('mongoose');

const vocabProgressSchema = new mongoose.Schema({
    userId: { type: String, required: true, unique: true },
    progress: { type: Object, default: {} }
});

module.exports = mongoose.model('VocabProgress', vocabProgressSchema);
