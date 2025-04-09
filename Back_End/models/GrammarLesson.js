const mongoose = require("mongoose");

const grammarLessonSchema = new mongoose.Schema({
  level: { type: String, required: true }, // Level A1 - C1
  title: { type: String, required: true }, // Tiêu đề bài học
  content: { type: String, required: true }, // Nội dung bài học dưới dạng chuỗi
});

module.exports = mongoose.model("GrammarLesson", grammarLessonSchema);
