const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

const app = express();

// ✅ CORS FIRST
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://her-sync-frontend-2to7jv4bm-elizabeths-projects-87ae47fe.vercel.app",
    "https://her-sync-frontend.vercel.app/"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

// ✅ Then middleware
app.use(express.json());

// ✅ Then routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/tasks", require("./routes/tasks"));
app.use("/api/transactions", require("./routes/transactions"));
app.use("/api/health", require("./routes/healthEntry"));
app.use("/api/ai", require("./routes/ai"));
app.use("/api/chat", require("./routes/chat"));
app.use("/api/profile", require("./routes/profile"));

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:");
    console.error(err);
  });

app.get("/", (req, res) => {
  res.send("API Running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));