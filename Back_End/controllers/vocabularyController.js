const Vocabulary = require("../models/VocabProgress");

// Lấy danh sách từ vựng đã học
exports.getVocabularyProgress = async (req, res) => {
  try {
    const { userId } = req.params;
    const vocabProgress = await Vocabulary.find({ userId });

    res.status(200).json(vocabProgress);
  } catch (error) {
    res.status(500).json({ message: "Lỗi lấy dữ liệu", error });
  }
};

// Cập nhật trạng thái từ vựng
exports.updateVocabularyStatus = async (req, res) => {
  try {
    const { userId, word, status } = req.body;

    let vocab = await Vocabulary.findOne({ userId, word });

    if (vocab) {
      vocab.status = status;
      vocab.updatedAt = Date.now();
    } else {
      vocab = new Vocabulary({ userId, word, status });
    }

    await vocab.save();
    res.status(200).json({ message: "Cập nhật trạng thái thành công!", vocab });
  } catch (error) {
    res.status(500).json({ message: "Lỗi cập nhật trạng thái", error });
  }
};
