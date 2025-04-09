const express = require("express");
const GrammarLesson = require("../models/GrammarLesson");

const router = express.Router();

// 📌 API thêm danh sách bài học vào MongoDB
router.post("/add-lessons", async (req, res) => {
  try {
    const lessons = req.body; // Nhận danh sách bài học từ request body
    await GrammarLesson.insertMany(lessons); // Thêm bài học vào MongoDB
    res.status(201).json({ message: "Lessons added successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// 📌 API lấy danh sách bài học
router.get("/lessons", async (req, res) => {
  try {
    const lessons = await GrammarLesson.find(); // Lấy danh sách bài học từ MongoDB
    res.json(lessons); // Trả về danh sách bài học
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// 📌 API lấy nội dung bài học
router.get("/lesson-content/:id", async (req, res) => {
  try {
    const lesson = await GrammarLesson.findById(req.params.id); // Tìm bài học theo ID
    if (!lesson) return res.status(404).json({ message: "Lesson not found" });

    res.json({ title: lesson.title, content: lesson.content }); // Trả về tiêu đề và nội dung
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// 📌 API cập nhật bài học
router.put("/update-lesson/:id", async (req, res) => {
  const { level, title, content } = req.body; // Nhận dữ liệu bài học từ request body

  try {
    // Cập nhật bài học trong MongoDB
    const updatedLesson = await GrammarLesson.findByIdAndUpdate(
      req.params.id,   // ID bài học cần cập nhật
      { level, title, content },  // Dữ liệu cần cập nhật
      { new: true }     // Trả về bản cập nhật mới
    );

    if (!updatedLesson) {
      return res.status(404).json({ message: "Lesson not found" });
    }

    res.json({ message: "Lesson updated successfully", updatedLesson });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
});

// 📌 API xóa bài học
router.delete("/delete-lesson/:id", async (req, res) => {
  try {
    const deletedLesson = await GrammarLesson.findByIdAndDelete(req.params.id);

    if (!deletedLesson) {
      return res.status(404).json({ message: "Lesson not found" });
    }

    res.json({ message: "Lesson deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

module.exports = router;
