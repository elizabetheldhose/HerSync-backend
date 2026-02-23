const express = require("express");
const {generateHealthInsight} = require("../service/aiService");

const router = express.Router();

router.post("/health-insight", async (req, res) => {
  try {
    const insight = await generateHealthInsight(req.body.entries);
    res.json({ insight });
  } catch (err) {
    res.status(500).json({ error: "AI failed" });
  }
});

module.exports = router;
