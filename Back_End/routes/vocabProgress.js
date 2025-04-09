const express = require('express');
const router = express.Router();
const VocabProgress = require('../models/VocabProgress');

// Lưu hoặc cập nhật tiến trình học
router.post('/save', async (req, res) => {
    try {
        const { userId, progress } = req.body;

        const existingRecord = await VocabProgress.findOne({ userId });
        if (existingRecord) {
            existingRecord.progress = progress;
            await existingRecord.save();
        } else {
            await VocabProgress.create({ userId, progress });
        }

        res.json({ success: true, message: "Tiến trình đã lưu thành công!" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Lỗi lưu tiến trình!", error });
    }
});

// Lấy tiến trình học của user
router.get('/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const record = await VocabProgress.findOne({ userId });

        if (record) {
            res.json({ success: true, progress: record.progress });
        } else {
            res.json({ success: true, progress: {} }); // Nếu chưa có tiến trình nào
        }
    } catch (error) {
        res.status(500).json({ success: false, message: "Lỗi lấy tiến trình!", error });
    }
});

module.exports = router;
