const express = require("express");
const UserProfile = require("../models/UserProfile");
const authMiddleware = require("../middleware/auth");
const upload = require("../middleware/upload");

const router = express.Router();


// ================== GET PROFILE ==================
router.get("/", authMiddleware, async (req, res) => {

  let profile = await UserProfile.findOne({
    user: req.user.id,
  });

  if (!profile) {
    profile = new UserProfile({
      user: req.user.id,
    });
    await profile.save();
  }

  res.json(profile);
});


// ================== UPDATE PROFILE ==================
router.post("/", authMiddleware, async (req, res) => {

  const {
    name,
    age,
    height,
    weight,
    cycleLength,
    periodLength,
  } = req.body;

  let profile = await UserProfile.findOne({
    user: req.user.id,
  });

  if (profile) {

    profile.name = name;
    profile.age = age;
    profile.height = height;
    profile.weight = weight;
    profile.cycleLength = cycleLength;
    profile.periodLength = periodLength;

  } else {

    profile = new UserProfile({
      user: req.user.id,
      name,
      age,
      height,
      weight,
      cycleLength,
      periodLength,
    });

  }

  await profile.save();
  res.json(profile);
});


// ================== UPLOAD AVATAR ==================
router.post(
  "/upload-avatar",
  authMiddleware,
  upload.single("avatar"),
  async (req, res) => {

    if (!req.file) {
      return res.status(400).json({
        message: "No image uploaded"
      });
    }

    const imageUrl = req.file.path;

    let profile = await UserProfile.findOne({
      user: req.user.id,
    });

    if (!profile) {
      profile = new UserProfile({
        user: req.user.id,
        avatar: imageUrl,
      });
    } else {
      profile.avatar = imageUrl;
    }

    await profile.save();

    res.json(profile);
  }
);

module.exports = router;
