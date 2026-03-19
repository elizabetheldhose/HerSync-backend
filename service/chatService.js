const { GoogleGenerativeAI } = require("@google/generative-ai");

// ✅ FIX 1: API key from environment variable — never hardcode in source
// ✅ FIX 2: Correct model name — "gemini-3-flash-preview" does not exist
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function generateChatResponse(message, history) {
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash", // ✅ valid model
  });

  // Format history for context
  const formattedHistory = history
    .map(
      (msg) => `${msg.sender === "user" ? "User" : "Assistant"}: ${msg.text}`,
    )
    .join("\n");

  const prompt = `
You are a warm, knowledgeable women's health assistant for the HerSync app.
Answer clearly and supportively. Keep responses under 4 sentences.

${formattedHistory ? `Conversation so far:\n${formattedHistory}\n` : ""}
User: ${message}
`;

  const result = await model.generateContent(prompt);
  const response = await result.response;

  return response.text();
}

module.exports = { generateChatResponse };
