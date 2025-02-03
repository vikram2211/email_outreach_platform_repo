const Metrics = require("../models/metricsModel");

const getMetrics = async (req, res) => {
    try {
        const metrics = await Metrics.find({ userId: req.user.id });
        res.status(200).json(metrics);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to fetch metrics" });
    }
};

module.exports = {
    getMetrics,
};
