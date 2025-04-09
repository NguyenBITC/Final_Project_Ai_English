const mongoose = require("mongoose");

const wordSchema = new mongoose.Schema({
  word: String,
  meaning: String,
  example: String
});

const vocabularySchema = new mongoose.Schema({
  category: String,
  words: [wordSchema]
});

const Vocabulary = mongoose.model("Vocabulary", vocabularySchema);

module.exports = Vocabulary;
