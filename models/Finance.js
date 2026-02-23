const mongoose = require("mongoose");

const financeSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["income", "expense"],
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  category: String,
  note: String,
  date: {
    type: Date,
    default: Date.now
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
}, { timestamps: true });

module.exports = mongoose.model("Finance", financeSchema);
