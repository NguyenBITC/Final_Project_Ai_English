const express = require("express");
const { register, login, updateLevel } = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.patch("/updateLevel", authMiddleware, updateLevel); // ✅ Gắn middleware

module.exports = router;
