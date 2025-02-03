const express = require("express");
const multer = require("multer");

const {
  createCampaign,
  uploadCSV,
} = require("../controllers/campaignController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// POST /api/campaign/create
router.post("/create", authMiddleware, createCampaign);

const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

// POST /api/campaign/upload
router.post("/upload", authMiddleware, upload.single("file"), uploadCSV);

module.exports = router;
