const mongoose = require("mongoose");

const UserProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  name: String,
  age: Number,
  height: Number,
  weight: Number,
  cycleLength: {
    type: Number,
    default: 28,
  },
  periodLength: {
    type: Number,
    default: 5,
  },
  avatar: {
  type: String,
},
});

module.exports = mongoose.model(
  "UserProfile",
  UserProfileSchema
);
