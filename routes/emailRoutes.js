const express = require("express");
const { sendEmails ,createEmailTemplate,createEmailContentOpenAi} = require("../controllers/emailController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// POST /api/email/
router.post("/send", authMiddleware, sendEmails);
router.post('/create', authMiddleware, createEmailTemplate);   
router.post('/generate', authMiddleware, createEmailContentOpenAi);   

module.exports = router;
