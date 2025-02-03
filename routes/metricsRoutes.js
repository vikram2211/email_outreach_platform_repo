const express = require("express");
const { getMetrics } = require("../controllers/metricsController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// GET /api/metrics
router.get("/", authMiddleware, getMetrics);

module.exports = router;
