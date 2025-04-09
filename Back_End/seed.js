const mongoose = require("mongoose");
const Vocabulary = require("./models/Vocabulary");
require("dotenv").config();

// Dữ liệu từ vocabularyData
const vocabularyData = [
  {
    category: "Giao tiếp hàng ngày",
    words: [
      { word: "Hello", meaning: "Xin chào", example: "Hello, how are you?" },
      { word: "Goodbye", meaning: "Tạm biệt", example: "Goodbye! See you later." },
      { word: "Thank you", meaning: "Cảm ơn", example: "Thank you for your help!" },
      { word: "Excuse me", meaning: "Xin lỗi (lịch sự)", example: "Excuse me, can you help me?" },
      { word: "Sorry", meaning: "Xin lỗi", example: "Sorry, I didn’t mean to do that." },
      { word: "Please", meaning: "Làm ơn", example: "Please give me a cup of coffee." }
    ],
  },
  {
    category: "Cảm xúc và trạng thái",
    words: [
      { word: "Happy", meaning: "Vui vẻ", example: "I feel happy today!" },
      { word: "Sad", meaning: "Buồn", example: "He looks sad after the news." },
      { word: "Angry", meaning: "Tức giận", example: "She was angry about the delay." },
      { word: "Hungry", meaning: "Đói", example: "I’m very hungry, let’s eat!" },
      { word: "Thirsty", meaning: "Khát", example: "I'm thirsty, can I have some water?" },
      { word: "Sleepy", meaning: "Buồn ngủ", example: "I’m feeling sleepy after lunch." }
    ],
  },
  {
    category: "Thời gian và ngày tháng",
    words: [
      { word: "Day", meaning: "Ngày", example: "Have a nice day!" },
      { word: "Night", meaning: "Đêm", example: "Good night! Sleep well." },
      { word: "Morning", meaning: "Buổi sáng", example: "Good morning! How are you?" },
      { word: "Afternoon", meaning: "Buổi chiều", example: "Good afternoon, sir!" },
      { word: "Evening", meaning: "Buổi tối", example: "Good evening, everyone!" }
    ],
  },
  {
    category: "Công việc và nghề nghiệp",
    words: [
      { word: "Teacher", meaning: "Giáo viên", example: "My teacher is very kind." },
      { word: "Student", meaning: "Học sinh", example: "The student is studying hard." },
      { word: "Doctor", meaning: "Bác sĩ", example: "The doctor is very helpful." },
      { word: "Engineer", meaning: "Kỹ sư", example: "My brother is an engineer." },
      { word: "Singer", meaning: "Ca sĩ", example: "She is a famous singer." },
      { word: "Writer", meaning: "Nhà văn", example: "He is a talented writer." }
    ],
  },
  {
    category: "Phương tiện giao thông",
    words: [
      { word: "Airport", meaning: "Sân bay", example: "We arrived at the airport early." },
      { word: "Train", meaning: "Tàu hỏa", example: "I travel by train to my hometown." },
      { word: "Bus", meaning: "Xe buýt", example: "The bus is very crowded today." },
      { word: "Car", meaning: "Xe hơi", example: "He bought a new car." },
      { word: "Bicycle", meaning: "Xe đạp", example: "She rides a bicycle to school." },
      { word: "Motorbike", meaning: "Xe máy", example: "I go to work by motorbike." }
    ],
  }
];

// Kết nối MongoDB và chèn dữ liệu
const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    await Vocabulary.deleteMany(); // Xóa dữ liệu cũ (nếu có)
    await Vocabulary.insertMany(vocabularyData); // Chèn dữ liệu mới

    console.log("✅ Dữ liệu từ vựng đã được chèn vào database thành công!");
    mongoose.connection.close();
  } catch (error) {
    console.error("❌ Lỗi khi chèn dữ liệu:", error);
  }
};

// Gọi hàm seedDatabase()
seedDatabase();
