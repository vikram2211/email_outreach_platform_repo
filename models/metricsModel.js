const mongoose = require("mongoose");

const metricSchema = new mongoose.Schema({
    campaignId: { type: mongoose.Schema.Types.ObjectId, ref: "Campaign", required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    emailsSent: { type: Number, default: 0 },
    emailsPending: { type: Number, default: 0 },
    emailsFailed: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Metric", metricSchema);
