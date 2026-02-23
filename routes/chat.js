
const router = require("express").Router();
const authMiddleware = require("../middleware/auth");
const { generateChatResponse } = require("../service/chatService");


router.post("/", authMiddleware, async (req, res) => {
  const { message, history } = req.body;

  const response = await generateChatResponse(message, history);

  res.json({ reply: response });
});


module.exports = router;
