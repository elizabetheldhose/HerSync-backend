const router = require("express").Router();
const Transactions = require("../models/Transaction");


const authMiddleware = require("../middleware/auth");

// Get all expenses
router.get("/", authMiddleware, async (req, res) => {
  const transactions = await Transactions.find({ user: req.user.id }).sort({ date: -1 });
  res.json(transactions);
});

// Add expense
router.post("/", authMiddleware, async (req, res) => {
  const { amount, category, note, date, type } = req.body;

  const transaction = new Transactions({
    user: req.user.id,
    amount,
    category,
    note,
    date,
    type
  });

  await transaction.save();
  res.json(transaction);
});

// Delete
router.delete("/:id", authMiddleware, async (req, res) => {
  await Transactions.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

module.exports = router;
