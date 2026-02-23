const mongoose = require("mongoose");

const HealthEntrySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    date: {
      type: Date,
      required: true,
    },

    mood: String,

    water: {
      type: Number,
      default: 0,
    },

    sleep: {
      type: Number,
      default: 0,
    },

    symptoms: String,

    period: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "HealthEntry",
  HealthEntrySchema
);
