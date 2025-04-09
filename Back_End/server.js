require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");

const userRoutes = require("./routes/userRoutes");
const vocabProgressRoutes = require("./routes/vocabProgress");
const grammarRoutes = require("./routes/grammarRoutes");
const vocabularyRoutes = require("./routes/vocabularyRoutes");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// Routes
app.use("/api/users", userRoutes);
app.use("/api/vocab-progress", vocabProgressRoutes);
app.use("/api/grammar", grammarRoutes);
app.use("/api/vocabulary", vocabularyRoutes);

// Kết nối MongoDB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
// Export app for testing purposes
