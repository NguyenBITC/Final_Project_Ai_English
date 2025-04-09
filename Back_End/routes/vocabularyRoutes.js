const express = require("express");
const Vocabulary = require("../models/Vocabulary");
const router = express.Router();

// Lấy toàn bộ danh sách từ vựng
router.get("/", async (req, res) => {
  try {
    const vocabulary = await Vocabulary.find();
    res.json(vocabulary);
  } catch (error) {
    res.status(500).json({ message: "Error fetching vocabulary", error });
  }
});

module.exports = router;
