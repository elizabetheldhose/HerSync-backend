const express = require("express");
const HealthEntry = require("../models/HealthEntry");
const authMiddleware = require("../middleware/auth");
const { generateHealthInsight } = require("../service/aiService");

const router = express.Router();

/* ===========================
   GET ALL HEALTH ENTRIES
=========================== */
router.get("/", authMiddleware, async (req, res) => {
  try {
    const entries = await HealthEntry.find({
      user: req.user.id,
    }).sort({ date: -1 });

    res.json(entries);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch entries" });
  }
});

/* ===========================
   CREATE OR UPDATE ENTRY
=========================== */
router.post("/", authMiddleware, async (req, res) => {
  console.log("Received health entry data:", req.body);
  try {
    const { date, mood, symptoms, period } =
      req.body;

      const sleep = Number(req.body.sleep) || 0;
const water = Number(req.body.water) || 0;


    // 1️⃣ Find existing entry for that date
    let entry = await HealthEntry.findOne({
      user: req.user.id,
      date,
    });

    console.log("Existing entry for date:", entry);
    if (entry) {
      entry.mood = mood;
      entry.water = water;
      entry.sleep = sleep;
      entry.symptoms = symptoms;
      entry.period = period;
    } else {
      entry = new HealthEntry({
        user: req.user.id,
        date,
        mood,
        water: water ? Number(water) : 0,
        sleep: sleep ? Number(sleep) : 0,
        symptoms,
        period,
      });
    }
console.log("Saving entry:", entry);
    await entry.save();

    // 2️⃣ Get full history of this user
    const allUserEntries = await HealthEntry.find({
      user: req.user.id,
    }).sort({ date: 1 });

    // 3️⃣ Local rule-based insights
    const localInsights = analyzeEntry(entry, allUserEntries);

    let aiInsight = null;

    // 4️⃣ Only trigger AI when meaningful
    if (entry.period || entry.symptoms || water < 2) {
      aiInsight = await generateHealthInsight({
        entry,
        history: allUserEntries,
      });
    }

    res.json({
      entry,
      localInsights,
      aiInsight,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to save entry" });
  }
});

/* ===========================
   LOCAL ANALYSIS FUNCTION
=========================== */

function analyzeEntry(entry, history) {
  const insights = [];

  // 🚺 Cycle detection (basic)
  const periodEntries = history.filter((e) => e.period);

  if (periodEntries.length >= 2) {
    const lastTwo = periodEntries.slice(-2);

    const cycleLength =
      (new Date(lastTwo[1].date) -
        new Date(lastTwo[0].date)) /
      (1000 * 60 * 60 * 24);

    if (cycleLength < 21 || cycleLength > 35) {
      insights.push(
        `Your recent cycle length was ${cycleLength} days. This may be irregular. Consider consulting a gynecologist if this continues.`
      );
    }
  }

  // 💧 Water check
  if (entry.water && entry.water < 2) {
    insights.push(
      "Your water intake is low today. Staying hydrated helps regulate hormones and reduce fatigue."
    );
  }

  // 😴 Sleep check
  if (entry.sleep && entry.sleep < 6) {
    insights.push(
      "You logged less than 6 hours of sleep. Poor sleep can impact mood and cycle regularity."
    );
  }

  // 😟 Symptoms
  if (entry.symptoms) {
    insights.push(
      "You logged symptoms today. If they persist or worsen, consider medical guidance."
    );
  }

  return insights;
}

module.exports = router;
