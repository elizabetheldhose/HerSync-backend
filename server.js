const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const taskRoutes = require("./routes/tasks");
const expenseRoutes = require("./routes/transactions");
const healthEntryRoutes = require("./routes/healthEntry");  
const aiRoutes = require("./routes/ai");
const chatRoutes = require("./routes/chat");
const UserProfile = require("./models/UserProfile");  


require("dotenv").config();

const app = express();


app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/transactions", expenseRoutes);
app.use("/api/health", healthEntryRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/chat", chatRoutes); // Add this line to include profile routes
app.use("/api/profile", require("./routes/profile"));

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://her-sync-frontend-2to7jv4bm-elizabeths-projects-87ae47fe.vercel.app"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));


console.log("MONGO_URI:", process.env.MONGO_URI);
mongoose.connect(process.env.MONGO_URI,{
  tls: true,
  tlsAllowInvalidCertificates: true,
})

  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:");
    console.error(err);
  });

app.get("/", (req, res) => {
  res.send("API Running...");
});

app.listen(5000, () => console.log("Server running on port 5000"));
